export const AVATAR_THINKING_EVENT = "portfolio-avatar-thinking";

export function setAvatarThinking(isThinking: boolean) {
  window.dispatchEvent(
    new CustomEvent<boolean>(AVATAR_THINKING_EVENT, { detail: isThinking }),
  );
}
