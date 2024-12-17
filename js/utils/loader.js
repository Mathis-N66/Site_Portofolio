export function initializeLoader() {
    const loaderWrapper = document.createElement('div');
    loaderWrapper.className = 'loader-wrapper';
    loaderWrapper.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loaderWrapper);

    return {
        hide: () => {
            loaderWrapper.classList.add('hidden');
            setTimeout(() => {
                loaderWrapper.remove();
            }, 500);
        }
    };
}