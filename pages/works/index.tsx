import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import styles from './index.module.css'

const myProjects = [
  { name: 'Aquarium', link: '/works/aquarium', image: '/aquarium.jpg' },
  { name: 'WIP-Win98Retroative-WIP', link: '/boot', image: '/oldwin.jpg' },
  { name: 'WIP-Resteam-WIP', link: '/works/restream', image: '' },
]

export default function Works() {
  const [clicked, setClicked] = useState<Number>()
  return (
    <Flex className={clicked !== undefined ? styles.clickedBox : styles.box}>
      {myProjects.map((project, idx) => (
        // <Link href={project.link} key={idx}>
        <Image
          key={idx}
          src={project.image ? project.image : '/noImage.webp'}
          borderRadius="8px"
          className={
            clicked === idx
              ? styles.opened
              : clicked !== undefined
              ? styles.closed
              : styles.default
          }
          onClick={() => setClicked(idx)}
        />
        // </Link>
      ))}
    </Flex>
  )
}
