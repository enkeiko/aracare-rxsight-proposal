document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate TOC automatically from H2 tags
    const tocList = document.getElementById('toc-list');
    tocList.innerHTML = ''; // Prevent duplicates
    const headers = document.querySelectorAll('.chapter h2');

    headers.forEach(header => {
        const id = header.parentElement.id;
        const title = header.textContent;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = title;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(a.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        li.appendChild(a);
        tocList.appendChild(li);
    });

    // 2. Scroll Spy - Highlight active TOC item
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.sidebar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    document.querySelectorAll('.chapter').forEach(section => {
        observer.observe(section);
    });

    // 3. Copy to Clipboard Functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-text');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.textContent;
                btn.textContent = '복사 완료!';
                btn.style.backgroundColor = '#2e7d32'; // Success Green
                btn.style.borderColor = '#2e7d32';
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            });
        });
    });
});
