// Tab Switching Logic
        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.agenda-list').forEach(list => list.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }

        // Countdown Logic (Target: April 15, 2026 09:00:00 PST)
        const targetDate = new Date('April 15, 2026 09:00:00 GMT-0800').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById('cd-days').innerText = "00";
                document.getElementById('cd-hours').innerText = "00";
                document.getElementById('cd-minutes').innerText = "00";
                document.getElementById('cd-seconds').innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('cd-days').innerText = days.toString().padStart(2, '0');
            document.getElementById('cd-hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('cd-minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('cd-seconds').innerText = seconds.toString().padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Checkout & Payment Logic
        let currentOrder = {
            name: '',
            amountCents: 0
        };

        function openCheckout(productName, amountCents) {
            currentOrder.name = productName;
            currentOrder.amountCents = amountCents;
            
            document.getElementById('modal-product-name').innerText = productName;
            document.getElementById('modal-product-price').innerText = '$' + (amountCents / 100).toFixed(2);
            document.getElementById('checkout-modal').classList.add('active');
        }

        function closeCheckout() {
            document.getElementById('checkout-modal').classList.remove('active');
            document.getElementById('checkout-form').reset();
        }

        function processOrder(e) {
            e.preventDefault();
            
            const buyerName = document.getElementById('buyer-name').value.trim();
            const buyerEmail = document.getElementById('buyer-email').value.trim();

            if (!buyerName || !buyerEmail) return;

            const paymentConfig = {
                amountCents: currentOrder.amountCents,
                productName: currentOrder.name,
                productDescription: `DevConnect 2026 ${currentOrder.name} for ${buyerName} (${buyerEmail})`
            };

            if (typeof window.__processPayment === 'function') {
                window.__processPayment(paymentConfig);
            } else {
                console.warn('window.__processPayment is not defined. Simulating payload:', paymentConfig);
                alert('Payment system triggered.\n\nSimulated Payload:\nAmount: ' + paymentConfig.amountCents + ' cents\nProduct: ' + paymentConfig.productName);
            }

            closeCheckout();
        }

        // Close modal on outside click
        document.getElementById('checkout-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeCheckout();
            }
        });