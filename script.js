
 // Carrossel de fotos do carro.
            (function () {
                var track = document.getElementById('track');
                var dotsBox = document.getElementById('dots');
                var n = track.children.length;
                var cur = 0;
                var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                for (var i = 0; i < n; i++) {
                    var b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'dot';
                    b.setAttribute('aria-label', 'Ir para a foto ' + (i + 1));
                    b.addEventListener('click', (function (k) {
                        return function () {
                            go(k);
                        };
                    })(i));
                    dotsBox.appendChild(b);
                }

                var dots = dotsBox.children;

                function mark() {
                    for (var i = 0; i < n; i++) {
                        dots[i].setAttribute('aria-current', i === cur ? 'true' : 'false');
                    }
                }

                function go(i) {
                    cur = (i + n) % n;
                    track.scrollTo({
                        left: cur * track.clientWidth,
                        behavior: reduce ? 'auto' : 'smooth'
                    });
                    mark();
                }

                document.getElementById('prev').addEventListener('click', function () {
                    go(cur - 1);
                });

                document.getElementById('next').addEventListener('click', function () {
                    go(cur + 1);
                });

                track.addEventListener('scroll', function () {
                    var i = Math.round(track.scrollLeft / track.clientWidth);
                    if (i !== cur) {
                        cur = i;
                        mark();
                    }
                }, { passive: true });

                mark();
            })();

            // Carrossel de depoimentos.
            const track = document.querySelector('.rev-track');
            const slides = document.querySelectorAll('.rev');
            const prev = document.querySelector('.rev-btn.prev');
            const next = document.querySelector('.rev-btn.next');
            const dotsContainer = document.querySelector('.rev-dots');
            let current = 0;
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('rev-dot');
                dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
                dot.addEventListener('click', () => {
                    current = index;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.rev-dot');
            function updateCarousel() {
                track.style.transform = `translateX(-${current * 100}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === current);
                });
            }
            next.addEventListener('click', () => {
                current = (current + 1) % slides.length;
                updateCarousel();
            });
            prev.addEventListener('click', () => {
                current = (current - 1 + slides.length) % slides.length;
                updateCarousel();
            });
