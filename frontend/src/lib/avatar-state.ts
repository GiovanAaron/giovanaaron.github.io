export const AVATAR_THINKING_EVENT = "portfolio-avatar-thinking";
export const AVATAR_SLEEPING_EVENT = "portfolio-avatar-sleeping";

export function setAvatarThinking(isThinking: boolean) {
  window.dispatchEvent(
    new CustomEvent<boolean>(AVATAR_THINKING_EVENT, { detail: isThinking }),
  );
}

export function triggerAvatarSleeping() {
  window.dispatchEvent(new Event(AVATAR_SLEEPING_EVENT));
}
