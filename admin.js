document.addEventListener('DOMContentLoaded', function() {
            // Configuration
            const ADMIN_WHATSAPP_NUMBER = "94754551129"; // Replace with your WhatsApp number
            
            // Authentication data
            const authData = {
                // Step 1: Master Password
                masterPassword: "003@Thuli_$Deshan:C2",
                
                // Step 2: Security Questions (id: {question, answer})
                securityQuestions: {
                    1: {
                        question: "What was the name of your Favorite person ?",
                        answer: "School_Teacher"
                    },
                    2: {
                        question: "Where did you perform your first penetration test?",
                        answer: "School_Lab"
                    },
                    3: {
                        question: "What is your favorite encryption Subject?",
                        answer: "Maths_Cyber"
                    }
                },
                
                // Step 3: Biometric token (simulated)
                biometricToken: "b10m3tr1c_$c4n_2023"
            };
            
            // DOM elements
            const loginScreen = document.getElementById('login-screen');
            const mainContent = document.getElementById('main-content');
            const errorMsg = document.getElementById('error-msg');
            const securityAlert = document.getElementById('security-alert');
            const blockedMessage = document.getElementById('blocked-message');
            const whatsappAlert = document.getElementById('whatsapp-alert');
            
            // Step elements
            const steps = {
                1: document.getElementById('step1'),
                2: document.getElementById('step2'),
                3: document.getElementById('step3')
            };
            
            const stepDots = {
                1: document.getElementById('step1-dot'),
                2: document.getElementById('step2-dot'),
                3: document.getElementById('step3-dot')
            };
            
            // Navigation buttons
            const step1Next = document.getElementById('step1-next');
            const step2Back = document.getElementById('step2-back');
            const step2Next = document.getElementById('step2-next');
            const step3Back = document.getElementById('step3-back');
            const step3Submit = document.getElementById('step3-submit');
            
            // Input fields
            const passwordInput = document.getElementById('password-input');
            const securityQuestion = document.getElementById('security-question');
            const securityAnswer = document.getElementById('security-answer');
            const biometricScan = document.getElementById('biometric-scan');
            
            // Security system variables
            let failedAttempts = 0;
            let isBlocked = false;
            let blockedUntil = null;
            const maxAttempts = 3;
            const blockDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
            
            // Current step tracking
            let currentStep = 1;
            let step1Completed = false;
            let step2Completed = false;
            
            // Animation containers
            const katanaContainer = document.getElementById('katana-container');
            const nitroContainer = document.getElementById('nitro-container');
            
            // Initialize steps
            function initSteps() {
                // Show only the first step initially
                Object.values(steps).forEach(step => step.classList.remove('active'));
                steps[1].classList.add('active');
                
                // Reset step indicators
                Object.values(stepDots).forEach(dot => {
                    dot.classList.remove('active', 'completed');
                });
                stepDots[1].classList.add('active');
                
                // Focus on first input
                passwordInput.focus();
            }
            
            // Move to step
            function goToStep(stepNumber) {
                // Validate step number
                if (stepNumber < 1 || stepNumber > 3) return;
                
                // Hide all steps
                Object.values(steps).forEach(step => step.classList.remove('active'));
                
                // Show the selected step
                steps[stepNumber].classList.add('active');
                
                // Update step indicators
                Object.values(stepDots).forEach(dot => {
                    dot.classList.remove('active', 'completed');
                });
                
                // Mark previous steps as completed
                for (let i = 1; i < stepNumber; i++) {
                    stepDots[i].classList.add('completed');
                }
                
                // Mark current step as active
                stepDots[stepNumber].classList.add('active');
                
                // Update current step
                currentStep = stepNumber;
                
                // Focus on first input in the step
                if (stepNumber === 1) passwordInput.focus();
                if (stepNumber === 2) securityQuestion.focus();
                if (stepNumber === 3) biometricScan.focus();
            }
            
            // Check if IP is blocked in localStorage
            function checkBlockedStatus() {
                const blockedData = localStorage.getItem('blockedIPs');
                if (blockedData) {
                    const blockedIPs = JSON.parse(blockedData);
                    const clientIP = getIP();
                    
                    if (blockedIPs[clientIP] && new Date(blockedIPs[clientIP]) > new Date()) {
                        isBlocked = true;
                        blockedUntil = new Date(blockedIPs[clientIP]);
                        updateBlockedMessage();
                        return true;
                    }
                }
                return false;
            }
            
            // Get user details for security alerts
            function getUserDetails() {
                return {
                    time: new Date().toLocaleString(),
                    ip: getIP(),
                    device: navigator.userAgent,
                    location: getLocationInfo()
                };
            }
            
            // Simplified IP detection
            function getIP() {
                return 'demo-ip-' + Math.floor(Math.random() * 1000); // Simulated IP for demo
            }
            
            // Simplified location detection
            function getLocationInfo() {
                return "Approximate location: " + (navigator.geolocation ? "Available" : "Unknown");
            }
            
            // Send WhatsApp alert
            function sendWhatsAppAlert(message) {
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
                
                // Show notification
                whatsappAlert.style.display = 'block';
                setTimeout(() => {
                    whatsappAlert.style.display = 'none';
                }, 3000);
            }
            
            // Block the IP
            function blockIP() {
                const clientIP = getIP();
                const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '{}');
                
                const unblockTime = new Date(Date.now() + blockDuration);
                blockedIPs[clientIP] = unblockTime.toISOString();
                localStorage.setItem('blockedIPs', JSON.stringify(blockedIPs));
                
                isBlocked = true;
                blockedUntil = unblockTime;
                updateBlockedMessage();
                
                // Send WhatsApp alert
                const userDetails = getUserDetails();
                const alertMessage = 
                    `🚨 SECURITY ALERT! 🚨\n\n` +
                    `Multiple failed login attempts detected:\n\n` +
                    `⏰ Time: ${userDetails.time}\n` +
                    `📡 IP: ${userDetails.ip}\n` +
                    `💻 Device: ${userDetails.device}\n` +
                    `📍 Location: ${userDetails.location}\n\n` +
                    `This IP has been temporarily blocked.`;
                
                sendWhatsAppAlert(alertMessage);
            }
            
            // Update blocked message
            function updateBlockedMessage() {
                if (isBlocked && blockedUntil) {
                    const minsLeft = Math.ceil((blockedUntil - new Date()) / (1000 * 60));
                    blockedMessage.textContent = `> ACCESS BLOCKED. Try again in ${minsLeft} minute(s).`;
                    blockedMessage.classList.remove('hidden');
                    
                    // Disable all inputs and buttons
                    document.querySelectorAll('.step-input, .step-btn').forEach(el => {
                        el.disabled = true;
                    });
                    
                    // Check every minute if block has expired
                    const checkInterval = setInterval(() => {
                        if (new Date() >= blockedUntil) {
                            clearInterval(checkInterval);
                            isBlocked = false;
                            blockedUntil = null;
                            blockedMessage.textContent = '';
                            blockedMessage.classList.add('hidden');
                            document.querySelectorAll('.step-input, .step-btn').forEach(el => {
                                el.disabled = false;
                            });
                            failedAttempts = 0;
                        } else {
                            const minsLeft = Math.ceil((blockedUntil - new Date()) / (1000 * 60));
                            blockedMessage.textContent = `> ACCESS BLOCKED. Try again in ${minsLeft} minute(s).`;
                        }
                    }, 60000);
                }
            }
            
            // Create katana slash animation
            function createKatanaAnimation() {
                katanaContainer.style.display = 'block';
                
                for (let i = 0; i < 3; i++) {
                    const katana = document.createElement('div');
                    katana.className = 'katana';
                    katana.style.animationDelay = `${i * 0.2}s`;
                    katanaContainer.appendChild(katana);
                }
                
                setTimeout(() => {
                    katanaContainer.innerHTML = '';
                    katanaContainer.style.display = 'none';
                }, 1000);
            }
            
            // Create nitro boost animation
            function createNitroAnimation() {
                nitroContainer.style.display = 'block';
                
                for (let i = 0; i < 50; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'nitro-particle';
                    
                    // Random direction and distance
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    
                    particle.style.setProperty('--tx', `${tx}px`);
                    particle.style.setProperty('--ty', `${ty}px`);
                    particle.style.left = '50%';
                    particle.style.top = '50%';
                    particle.style.animationDelay = `${Math.random() * 0.5}s`;
                    
                    nitroContainer.appendChild(particle);
                }
                
                setTimeout(() => {
                    nitroContainer.innerHTML = '';
                    nitroContainer.style.display = 'none';
                }, 1500);
            }
            
            // Simulate typing animation
            const typingElements = document.querySelectorAll('.typing');
            typingElements.forEach((el, index) => {
                const text = el.textContent.replace('> ', '');
                el.textContent = '> ';
                
                setTimeout(() => {
                    typeWriter(el, text, 0, 50);
                }, index * 1500);
            });
            
            function typeWriter(element, text, i, speed) {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(() => typeWriter(element, text, i, speed), speed);
                } else {
                    element.style.borderRight = 'none';
                }
            }
            
            // Step 1: Password Verification
            step1Next.addEventListener('click', function() {
                if (isBlocked) return;
                
                const enteredPassword = passwordInput.value.trim();
                
                if (enteredPassword === authData.masterPassword) {
                    // Correct password - proceed to step 2
                    errorMsg.textContent = '';
                    step1Completed = true;
                    goToStep(2);
                } else {
                    // Incorrect password
                    failedAttempts++;
                    errorMsg.textContent = "⚠️ ERROR: Access Denied";
                    passwordInput.value = '';
                    passwordInput.focus();
                    
                    // Add glitch effect
                    loginScreen.classList.add('glitch-error');
                    setTimeout(() => {
                        loginScreen.classList.remove('glitch-error');
                    }, 500);
                    
                    // After max failed attempts
                    if (failedAttempts >= maxAttempts) {
                        const userDetails = getUserDetails();
                        const alertMessage = 
                            `SECURITY ALERT!\n\n` +
                            `Multiple failed login attempts detected:\n\n` +
                            `Time: ${userDetails.time}\n` +
                            `IP: ${userDetails.ip}\n` +
                            `Device: ${userDetails.device}\n` +
                            `Location: ${userDetails.location}\n\n` +
                            `This IP has been temporarily blocked.`;
                        
                        // Show security alert
                        securityAlert.textContent = alertMessage;
                        securityAlert.classList.remove('hidden');
                        
                        // Block the IP and send WhatsApp alert
                        blockIP();
                    }
                }
            });
            
            // Step 2: Security Question Verification
            step2Next.addEventListener('click', function() {
                if (isBlocked) return;
                
                const questionId = securityQuestion.value;
                const enteredAnswer = securityAnswer.value.trim();
                
                if (!questionId) {
                    errorMsg.textContent = "⚠️ ERROR: PLEASE SELECT A SECURITY QUESTION";
                    return;
                }
                
                if (!enteredAnswer) {
                    errorMsg.textContent = "⚠️ ERROR: PLEASE ENTER YOUR ANSWER";
                    securityAnswer.focus();
                    return;
                }
                
                const correctAnswer = authData.securityQuestions[questionId].answer;
                
                if (enteredAnswer === correctAnswer) {
                    // Correct answer - proceed to step 3
                    errorMsg.textContent = '';
                    step2Completed = true;
                    goToStep(3);
                } else {
                    // Incorrect answer
                    errorMsg.textContent = "> ERROR: INCORRECT SECURITY ANSWER";
                    securityAnswer.value = '';
                    securityAnswer.focus();
                }
            });
            
            // Step 3: Biometric Verification
            step3Submit.addEventListener('click', function() {
                if (isBlocked) return;
                simulateBiometricScan();
            });
            
            // Biometric scan simulation
            biometricScan.addEventListener('click', function() {
                if (isBlocked) return;
                simulateBiometricScan();
            });
            
            function simulateBiometricScan() {
                // Show scanning animation
                const icon = biometricScan.querySelector('i');
                icon.classList.remove('fa-fingerprint');
                icon.classList.add('fa-spinner', 'fa-spin');
                
                // Simulate scan delay
                setTimeout(() => {
                    // Successful scan
                    icon.classList.remove('fa-spinner', 'fa-spin');
                    icon.classList.add('fa-check');
                    
                    // Change button text
                    step3Submit.textContent = "[ ACCESS GRANTED ]";
                    step3Submit.style.backgroundColor = "var(--cyber-green)";
                    step3Submit.style.color = "var(--darker-bg)";
                    
                    // Complete authentication
                    setTimeout(completeAuthentication, 1000);
                }, 2000);
            }
            
            // Complete authentication process
            function completeAuthentication() {
                errorMsg.textContent = '';
                
                // Show appropriate animation
                createKatanaAnimation();
                setTimeout(createNitroAnimation, 500);
                
                // Grant access
                setTimeout(() => {
                    loginScreen.style.animation = 'fadeOut 1s forwards';
                    
                    setTimeout(() => {
                        loginScreen.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        
                        // Start cyber effects
                        startCyberEffects();
                    }, 1000);
                }, 1500);
                
                failedAttempts = 0;
            }
            
            // Navigation between steps
            step2Back.addEventListener('click', function() {
                goToStep(1);
            });
            
            step3Back.addEventListener('click', function() {
                goToStep(2);
            });
            
            // Allow Enter key to submit current step
            document.querySelectorAll('.step-input').forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        if (currentStep === 1) step1Next.click();
                        if (currentStep === 2) step2Next.click();
                        if (currentStep === 3) step3Submit.click();
                    }
                });
            });
            
            // Cyber effects after login
            function startCyberEffects() {
                // Animate skill bars
                document.querySelectorAll('.skill-bar').forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                });
                
                // Update cyber time
                function updateCyberTime() {
                    const now = new Date();
                    const timeString = now.toLocaleTimeString('en-US', {hour12: false});
                    document.getElementById('cyber-time').textContent = timeString;
                    
                    // Random glitch effect
                    if (Math.random() > 0.9) {
                        document.body.classList.add('glitch');
                        setTimeout(() => {
                            document.body.classList.remove('glitch');
                        }, 200);
                    }
                }
                
                setInterval(updateCyberTime, 1000);
                updateCyberTime();
                
                // Form submission
                const contactForm = document.getElementById('cyber-contact-form');
                
                if (contactForm) {
                    contactForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        // Get form values
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const message = document.getElementById('message').value;
                        
                        // Here you would normally send the data to a server
                        console.log(`Message from ${name} (${email}): ${message}`);
                        
                        // Show confirmation
                        alert("[ TRANSMISSION SUCCESSFUL ]\n\nYour message has been encrypted and transmitted.");
                        contactForm.reset();
                    });
                }
                
                // Add floating animation to random elements
                const elements = document.querySelectorAll('.project-card, .section-title');
                elements.forEach(el => {
                    if (Math.random() > 0.7) {
                        el.classList.add('floating');
                        // Randomize animation duration
                        el.style.animationDuration = `${3 + Math.random() * 2}s`;
                    }
                });
            }
            
            // Initialize the login process
            initSteps();
            
            // Check blocked status on page load
            window.addEventListener('load', () => {
                if (checkBlockedStatus()) {
                    document.querySelectorAll('.step-input, .step-btn').forEach(el => {
                        el.disabled = true;
                    });
                }
            });
            
            // Add CSS for glitch error
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOut {
                    to { opacity: 0; visibility: hidden; }
                }
                
                .glitch-error {
                    animation: glitch-error 0.5s linear;
                }
                
                @keyframes glitch-error {
                    0% { transform: translate(0); }
                    20% { transform: translate(-5px, 5px); }
                    40% { transform: translate(-5px, -5px); }
                    60% { transform: translate(5px, 5px); }
                    80% { transform: translate(5px, -5px); }
                    100% { transform: translate(0); }
                }
                
                .glitch {
                    animation: glitch 0.2s linear infinite;
                }
                
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-1px, 1px); }
                    40% { transform: translate(-1px, -1px); }
                    60% { transform: translate(1px, 1px); }
                    80% { transform: translate(1px, -1px); }
                    100% { transform: translate(0); }
                }
            `;
            document.head.appendChild(style);
        });
        // Replace the previous JavaScript with this
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const details = this.previousElementSibling;
        const isHidden = details.style.display === 'none';
        
        if (isHidden) {
            // Show with animation
            details.style.display = 'block';
            details.style.height = '0';
            details.style.overflow = 'hidden';
            
            // Calculate full height
            const fullHeight = details.scrollHeight + 'px';
            
            // Animate
            details.animate(
                [{ height: '0' }, { height: fullHeight }],
                { duration: 300, easing: 'ease-in-out' }
            ).onfinish = () => {
                details.style.height = 'auto';
            };
            
            this.textContent = '[ SHOW LESS ]';
        } else {
            // Hide with animation
            const fullHeight = details.scrollHeight + 'px';
            
            details.animate(
                [{ height: fullHeight }, { height: '0' }],
                { duration: 300, easing: 'ease-in-out' }
            ).onfinish = () => {
                details.style.display = 'none';
            };
            
            this.textContent = '[ READ MORE ]';
        }
        
        // Cyberpunk terminal sound effect (optional)
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positive-interface-beep-257.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    });
});