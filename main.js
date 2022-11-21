// import './styles/app.scss'
import barba from '@barba/core'
import gsap from 'gsap'

const amountOfCards = 0
const header = document.querySelector('header')
const cardSection = document.querySelector('section#cards')
const animationThing = document.querySelector('div.animation-thing')

if (cardSection && !!amountOfCards) {
  for (let i = 0; i < amountOfCards; i++) {
    cardSection.innerHTML += `
    <a href="otherPage.html" class="card">
      <div class="content">
        <h2>Card 1</h2>
      </div>
    </a>
    `
  }
}

gsap.from(header, {
  opacity: 0,
  y: -header.offsetHeight,
  duration: 0.5,
  delay: 0.5,
})

gsap.from('.card', {
  // y: 200,
  opacity: 0,
  stagger: {
    each: 0.1,
    from: 'center',
    grid: 'auto',
    // ease: 'power2.inOut',
  },
  duration: 1,
})

// barba.init({
//   transitions: [
//     {
//       name: 'default-transition',
//       leave(data) {
//         return gsap.to('header', { y: -document.querySelector('header').offsetHeight, duration: 0.5 })
//       },
//       enter(data) {
//         return gsap.to('header', { y: 0, delay: 0.7 })
//       },
//     },
//   ],
// })

let tl = gsap.timeline()
gsap.set('.animation-thing', {
  y: '100%',
})

barba.init({
  transitions: [
    {
      name: 'default-transition',
      preventRunning: true,
      enter(data) {
        gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.2,
          delay: 0.5,
        })
        // tl.set(animationThing, { top: '100%' })
        // tl.to(animationThing, { top: 0, duration: 0.5 })
        // tl.to(animationThing, { top: '-100%', duration: 0.5 })

        gsap.set('#animation-things', { zIndex: 1000 })
        tl.to('.animation-thing', {
          y: 0,
          duration: 0.5,
          stagger: {
            each: 0.1,
          },
        })
        tl.to('.animation-thing', {
          y: '-100%',
          stagger: {
            each: 0.1,
          },
          onComplete: () => {
            gsap.set('#animation-things', { zIndex: -1000 })
            gsap.set('.animation-thing', { y: '100%' })
          },
        })

        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.1,
          delay: 0.5,
          onComplete: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            console.log('complete')
          },
        })
      },
    },
  ],
})
