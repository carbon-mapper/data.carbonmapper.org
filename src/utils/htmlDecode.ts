export const htmlDecode = (text: string) => {
	const div = document.createElement('div');
	div.innerHTML = text;
	return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
}