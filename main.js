// Biyografi Detaylarını Açma/Kapama
function ayrintilariGoster() {
    const details = document.getElementById("detayliBiyografi");
    const button = document.getElementById("ayrintiGosterButon");
    
    if (details.style.display === "none") {
        details.style.display = "block";
        button.textContent = "Daha Az Gör";
    } else {
        details.style.display = "none";
        button.textContent = "Daha Fazla Gör";
    }
}

// Proje resimlerini açma/kapama
function fotoBuyult(imageSorce, description) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImage").src = imageSorce;
    document.getElementById("modalDescription").innerText = description;
}

function fotoKucult() {
    document.getElementById("modal").style.display = "none";
}

// Projeleri sıralama işlemi
function sirala() {
    const sortOption = document.getElementById("sirala").value;
    const projectsContainer = document.getElementById("projects");
    const projects = Array.from(projectsContainer.getElementsByClassName("project"));

    // Sıralama işlemi
    projects.sort((a, b) => {
        if (sortOption === "enSon") {
            return new Date(b.getAttribute("tarih")) - new Date(a.getAttribute("tarih"));
        } else if (sortOption === "enIyi") {
            return b.getAttribute("begeni") - a.getAttribute("begeni");
        }
    });

    // Sıralanmış projeleri yeniden ekleme
    projects.forEach(project => projectsContainer.appendChild(project));
}

// İletişim Formu
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('feedback');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!name) {
        feedback.textContent = "Lütfen isminizi girin.";
    } else if (!email) {
        feedback.textContent = "Lütfen e-posta adresinizi girin.";
    } else if (!emailPattern.test(email)) {
        feedback.textContent = "Geçerli bir e-pposta adresi girin.";
    } else if (!message) {
        feedback.textContent = "Lütfen mesajınızı yazın.";
    } else {
        feedback.style.color = "#88f";
        feedback.textContent = "Mesajınız başarıyla gönderildi!";
        document.getElementById('contactForm').reset();
    }
});

// Tarih ve saat güncelleme
function updateDateTime() {
    const now = new Date();

    document.getElementById("current-time").textContent = now.toLocaleString("tr-TR");

}

setInterval(updateDateTime, 1000);
updateDateTime();

