let afram = false // til að stöðva endurteknar post request

document.addEventListener('keydown', async function(event) {
        if (event.key === 'w' && !afram) {
				afram = true
                await fetch('/afram', {
                        method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ test: '2' })                    
                });
        }
});

document.addEventListener('keyup', async function(event) {
        if (event.key === 'w' && afram) {
				afram = false
				await fetch('/afram', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ test: '1' }) 
                });
        }
});

                        
