<script>
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('show'); // Alterna la clase para mostrar/ocultar el menú
    });
</script>