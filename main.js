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

if (blockSection && !!amountOfBlocks) {
  for (let i = 0; i < amountOfBlocks; i++) {
    blockSection.innerHTML += `
      <div class="block"></div>
    `
  }
}

// --------------------------------------------//
//                                             //
//                    DEMO                     //
//                                             //
// --------------------------------------------//

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// 1. Basic intro animations

const tlHeader = gsap.timeline()
const tlCards = gsap.timeline()

tlHeader.from(header, {
  opacity: 0,
  y: -header.offsetHeight,
  duration: 1,
  delay: 0.5,
})
tlHeader.to(header, {
  background: 'rgba(44, 62, 80, 0)',
  delay: 0.5,
})

if (cardSection) {
  tlCards.from('.card', {
    y: 200,
    opacity: 0,
    duration: 1,
    delay: 1,
  })
  tlCards.to('.card', {
    scale: 1.2,
  })
}

// 2. Row and Grid animations
const playBlockAnimation = 0
if (blockSection && amountOfBlocks && playBlockAnimation) {
  gsap.to('.block', {
    opacity: 0,
    duration: 3,
    delay: 0.5,
    stagger: {
      each: 0.2,
      from: 'center',
      grid: 'auto',
    },
  })
}

// 3. Page Transition
const tlPageTransition = gsap.timeline()

barba.init({
  transitions: [
    {
      leave(data) {
        gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
        })
        gsap.set('#bars-wrapper', { zIndex: 1000 })
        tlPageTransition.to('.bar', {
          y: 0,
          duration: 0.5,
          stagger: {
            each: 0.1,
          },
        })
      },

      enter(data) {
        tlPageTransition.to('.bar', {
          y: '-100%',
          stagger: {
            each: 0.1,
          },
          onComplete: () => {
            gsap.set('#bars-wrapper', { zIndex: -1000 })
            gsap.set('.bar', { y: '100%' })
            const cardSectionNextPage = data.next.container.querySelector('section#cards')
            const cards = data.next.container.querySelectorAll('.card')

            if (cardSectionNextPage) {
              gsap.to(cards, {
                scale: 1.2,
              })
            }
          },
        })
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 1,
          delay: 1,
        })
      },
    },
  ],
})
