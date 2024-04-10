

document.addEventListener('keydown', function(event) {
        if (event.key === 'w') {
                fetch('/afram', {
                        method: 'POST',
                        body: JSON.stringify({'test':'2'})
                        
                });
        }
});

document.addEventListener('keyup', function(event) {
        if (event.key === 'w') {
                fetch('/afram', {
                        method; 'POST',
                        body: JSON.stringify({'test':'1'})
                });
        }
});

                        
