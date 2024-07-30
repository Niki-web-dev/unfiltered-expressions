//work galley scroll while scroll page
const worksWrapper = document.querySelector('.works__wrapper');
const works = document.querySelector('.works');

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
    start: 'top top',
    end: `+=${works.clientHeight * 0.5}`,
    scrub: true,
  },
});
