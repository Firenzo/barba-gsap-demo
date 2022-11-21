// --------------------------------------------//
//                                             //
//                 DEMO SETUP                  //
//                                             //
// --------------------------------------------//

import gsap from 'gsap'
import barba from '@barba/core'

const header = document.querySelector('header')
const cardSection = document.querySelector('section#cards')
const blockSection = document.querySelector('section#blocks')
const amountOfBlocks = 0
const animationThing = document.querySelector('div.animation-thing')

// if (blockSection && !!amountOfBlocks) {
//   for (let i = 0; i < amountOfBlocks; i++) {
//     blockSection.innerHTML += `
//       <div class="block"></div>
//     `
//   }
// }

// --------------------------------------------//
//                                             //
//                    DEMO                     //
//                                             //
// --------------------------------------------//

// 1. Basic intro animations

// gsap.from(header, {
//   opacity: 0,
//   y: -header.offsetHeight,
//   duration: 1,
//   delay: 0.5,
// })

// if (cardSection) {
//   gsap.from('.card', {
//     y: 200,
//     opacity: 0,
//     duration: 1,
//     delay: 1,
//     stagger: {
//       each: 0.3,
//     },
//   })
// }

// 2. Row and Grid animations
const showBlockAnimation = 0
if (blockSection && amountOfBlocks && showBlockAnimation) {
  gsap.to('.block', {
    y: 100,
    opacity: 0,
    ease: 'power2.inOut',
    duration: 7,
    stagger: {
      each: 0.1,
      from: 'center',
      grid: 'auto',
      duration: 0.5,
    },
  })
}

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
