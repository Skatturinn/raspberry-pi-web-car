/**
 * Búum til post requestur fyrir hvern takka
 * @param {Array<string>} keys
 */
function keyvent(keys) {
    // Initialize key states
    const keyStates = {};
    keys.forEach(key => {
        keyStates[key] = false;
    });
    // Event listeners for key events
    ['keydown', 'keyup'].forEach(kvent => {
		const stafir = ['s', 'd', 'w', 'a']
        document.addEventListener(kvent, async function(event) {
            keys.forEach(async (key, nr) => {
				const state = (kvent === 'keydown'); // true þegar ýtt er á lykil
                if (event.key === key // Býr til viðbrögð fyrir hvern lykil/staf
					&& keyStates[key] !== state // passar að takkinn sé ekki að endurtaka breytingu
					&& keyStates[stafir[nr]] !== true // passar að gagnvirkur takki sé ekki virkur
				) {
                        keyStates[key] = state; // breytur stöðu
						await fetch('/takki', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ [key]: state })
                        }); // Sendir lykil og stöðu á bakenda
                }
            });
        });
    });
}
/**
 * Gerir HTML takka að takka á lyklaborði
 * @param {HTMLElement | null} element
 * @param {"up" | "down" | string} upOrDown 
 * @param {{ key: string, keyCode: number, code: string, which: number }} key 
 */
function eventreplication(element, upOrDown, key) {
		return element && element.addEventListener(`mouse${upOrDown}`,
	() => document.dispatchEvent(
		new KeyboardEvent(`key${upOrDown}`,key)
	))
}
const keys = ['w', 'a', 's', 'd'];
keys.forEach(key => {
    const variableName = `${key}_state`;
    window[variableName] = false;
});
/** Takkar */
const keyObjects = keys.map(key => {
    const keyCode = key.toUpperCase().charCodeAt(0);
    const code = 'Key' + key.toUpperCase();
    return {
        key: key,
        keyCode: keyCode,
        code: code,
        which: keyCode
    };
});

document.addEventListener('DOMContentLoaded', // Bíðum eftir að síða hefur hlaðið efni
() => {
	keys.forEach(
		(stak, nr) => ['up','down'].forEach(ud => 
			eventreplication(document.querySelector(`.${stak}`), ud, keyObjects[nr])
		) 
	)
})

keyvent(keys)// búum til events fyrir takka
