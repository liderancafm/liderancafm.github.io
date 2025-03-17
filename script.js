document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeControl = document.getElementById('volumeControl');
    const statusText = document.getElementById('statusText');
    
    // Substitua esta URL pelo link de streaming da sua rádio
    const streamUrl = 'https://radio.nexsync.online/listen/radio_lideran%C3%A7a_fm/radio.mp3';
    
    const audio = new Audio();
    audio.src = streamUrl;
    audio.preload = 'auto';
    
    // Configuração para autoplay
    audio.autoplay = true;
    
    let isPlaying = false;
    
    // Tentar iniciar a reprodução automaticamente
    const attemptAutoplay = function() {
        audio.play()
            .then(() => {
                isPlaying = true;
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                statusText.textContent = 'Transmitindo ao vivo';
            })
            .catch(e => {
                console.log('Autoplay bloqueado pelo navegador:', e);
                statusText.textContent = 'Clique para iniciar';
                // Não mudamos isPlaying para true pois o autoplay falhou
            });
    };
    
    // Tentar autoplay quando a página carregar
    attemptAutoplay();
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            statusText.textContent = 'Rádio parada';
        } else {
            audio.play()
                .then(() => {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    statusText.textContent = 'Transmitindo ao vivo';
                })
                .catch(e => {
                    console.error('Erro ao iniciar o streaming:', e);
                    statusText.textContent = 'Erro ao conectar';
                });
        }
        
        isPlaying = !isPlaying;
    });
    
    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Tratar erros de streaming
    audio.addEventListener('error', function() {
        statusText.textContent = 'Erro no streaming';
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        isPlaying = false;
    });
    
    // Tratar eventos de carregamento
    audio.addEventListener('waiting', function() {
        statusText.textContent = 'Carregando...';
    });
    
    audio.addEventListener('playing', function() {
        statusText.textContent = 'Transmitindo ao vivo';
    });
});