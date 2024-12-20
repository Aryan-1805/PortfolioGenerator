document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePortfolio();
    document.getElementById('downloadBtn').style.display = 'inline-block';
});

function generatePortfolio() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const email = document.getElementById('email').value;

    // Handle image upload
    const imageFile = document.getElementById('image').files[0];
    let imageHTML = '';
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageHTML = `
                <div class="image">
                    <img src="${e.target.result}" alt="Profile Image">
                </div>
            `;
            createPortfolioHTML();
        };
        reader.readAsDataURL(imageFile);
    } else {
        createPortfolioHTML();
    }

    function createPortfolioHTML() {
        const portfolioHTML = `
            <div class="portfolio-content">
                ${imageHTML}
                <h1>${name}</h1>
                <div class="title">${title}</div>
                <div class="bio">${bio}</div>
                <div class="skills">
                    <h3>Skills</h3>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="contact">
                    <h3>Contact</h3>
                    <p>Email: <a href="mailto:${email}">${email}</a></p>
                </div>
            </div>
        `;
        document.getElementById('portfolioPreview').innerHTML = portfolioHTML;
    }
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const portfolioContent = document.getElementById('portfolioPreview').innerHTML;
    const blob = new Blob([portfolioContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
    link.click();
});
