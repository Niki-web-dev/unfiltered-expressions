//work galley scroll while scroll page
document.addEventListener('DOMContentLoaded', function () {
  window.scrollTo(0, 0);

  const worksWrapper = document.querySelector('.works__wrapper');
  const works = document.querySelector('.detail-works');

  const wrapperWidth = worksWrapper.scrollWidth;
  const containerWidth = works.clientWidth;
  let scrollDistance;
  if (window.innerWidth > 480) {
    scrollDistance = wrapperWidth - containerWidth + containerWidth * 0.1;
  } else {
    scrollDistance = wrapperWidth - containerWidth + containerWidth * 0.23;
  }

  const scrollAmount = scrollDistance > 0 ? scrollDistance : 0;

  gsap.to(worksWrapper, {
    x: -scrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: works,
      start: '60%',
      end: `+=${works.clientHeight * 0.9}`,
      scrub: 2.5,
    },
  });

  const container = document.querySelector('.product__img-container');
  const images = document.querySelectorAll('.product__img');
  let scrollPosition = 0; // Keeps track of the scroll position
  let maxScroll; // Declare maxScroll variable

  // Function to update maxScroll based on window width
  function updateMaxScroll() {
    if (window.innerWidth < 480) {
      maxScroll = -(images.length * 160); // Value for mobile
    } else {
      maxScroll = -(images.length * 290); // Value for desktop
    }
  }

  // Call the function initially to set the correct maxScroll value
  updateMaxScroll();

  function handleScroll(e) {
    e.preventDefault();

    // Define how much the images should move per scroll event
    const scrollSpeed = 30; // Adjust scroll speed as needed

    // Adjust the scroll position based on the wheel delta
    scrollPosition += e.deltaY > 0 ? -scrollSpeed : scrollSpeed;

    // Limit the scroll position to avoid moving too far
    scrollPosition = Math.max(maxScroll, Math.min(0, scrollPosition));

    // Apply the transform to all images to simulate scrolling
    images.forEach((img) => {
      img.style.transform = `translateY(${scrollPosition}rem)`;
    });

    // If the scroll position has reached the limits, allow normal page scrolling
    if (scrollPosition === maxScroll || scrollPosition === 0) {
      container.removeEventListener('wheel', handleScroll);

      // Reattach the event listener after a short delay to allow normal scrolling
      setTimeout(() => {
        container.addEventListener('wheel', handleScroll);
      }, 200);
    }
  }

  // Attach the scroll handler
  container.addEventListener('wheel', handleScroll);

  // Update maxScroll value when the window is resized
  window.addEventListener('resize', updateMaxScroll);
});
