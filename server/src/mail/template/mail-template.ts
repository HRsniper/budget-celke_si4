export function clientTxt(client: string): String {
  return `Dear ${client},\n\nI received the budget request.\n\nThe budget will be forwarded soon\n\n`;
}

export function clientHtml(client: string): String {
  return `Dear ${client},<br><br>I received the budget request.<br><br>The budget will be forwarded soon<br><br>`;
}
