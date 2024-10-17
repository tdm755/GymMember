document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('title');
    
    if (window.location.href.includes("trainerdashboard")) {
        title.textContent = 'TrainerDashboard';
    }else{
        title.textContent = 'MemberDashboard';

    }
    
    console.log(title);
});