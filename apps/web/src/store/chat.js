var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { create } from 'zustand';
export var useChatStore = create(function (set) { return ({
    messages: [],
    setMessages: function (msgs) { return set({ messages: msgs }); },
    addMessage: function (msg) { return set(function (state) { return ({ messages: __spreadArray(__spreadArray([], state.messages, true), [msg], false) }); }); },
}); });
