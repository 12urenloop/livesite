import {writable} from "svelte/store";
import type {Count, SocketHandler, SocketMsg} from "$lib/types";
import {env} from "$env/dynamic/public";

const socketMsgHandler: Record<string, SocketHandler> = {
    counts: (msg: SocketMsg<Count[]>) => {
        const new_counts = msg.data.sort((c1, c2) => c2.count - c1.count)
        let prev_count = 0;
        let j = 1;
        new_counts.map((c) => {
            if (c.count < prev_count) j++;
            prev_count = c.count;
            c.rank = j;
        })
        counts.set(new_counts);
        max_laps.set(new_counts.reduce((a, b) => (a.count > b.count ? a : b)).count)

    },
    message: (msg: SocketMsg<string | null>) => {
        let notiElem = document.getElementById("notification-banner");
        if (!notiElem) return;
        notiElem.style.display = msg.data ? "block" : "none";
        notification.set(msg.data ?? "");
    },
};

export const counts = writable<Count[]>([]);
export const max_laps = writable(0);
export const notification = writable("");

export const startWebsocket = async (timeout = 0) => {
    timeout = Math.min(timeout, 5000);
    if (timeout > 0) {
        console.log(`Opening websocket with ${timeout / 1000}s timeout`);
        await new Promise((res) => setTimeout(res, timeout));
    }
    const socket = new WebSocket(env.PUBLIC_LOXSI_URL ?? "ws://localhost:8000/feed");
    socket.onerror = async (err) => {
        console.error(`WEBSOCKET ERROR:`, err);
    };
    socket.onclose = async (ev) => {
        console.error(`WEBSOCKET CLOSED:`, ev);
        await startWebsocket(timeout + 1000);
    };
    socket.onmessage = (ev) => {
        parse_message(ev.data);
    };
}

export function parse_message(inp: string) {
    try {
        let socketMsg: SocketMsg = JSON.parse(inp);
        if (!socketMsgHandler[socketMsg.topic]) {
            return;
        }
        socketMsgHandler[socketMsg.topic](socketMsg);
    } catch (err) {
        console.error(
            `ERROR: could not parse websocket message\nMessage: ${inp}\nReason: ${err}`,
        );
    }
}
