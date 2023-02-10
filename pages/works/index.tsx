import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import styles from './index.module.css'

const myProjects = [
  {
    name: 'Aquarium',
    link: '/works/aquarium',
    image: '/aquarium.jpg',
    text: 'Paes é o prefeito mais feliz do mundo, que dirige a cidade mais importante do mundo e da galáxia. Por que da galáxia? Porque a galáxia é o Rio de Janeiro. A via Láctea é fichinha perto da galáxia que o nosso querido Eduardo Paes tem a honra de ser prefeito. Primeiro, eu queria te dizer que eu tenho muito respeito pelo ET de Varginha. E eu sei que aqui, quem não viu conhece alguém que viu, ou tem alguém na família que viu, mas de qualquer jeito eu começo dizendo que esse respeito pelo ET de Varginha está garantido',
  },
  {
    name: 'WIP-Win98Retroative-WIP',
    link: '/boot',
    image: '/oldwin.jpg',
    text: 'some text',
  },
  {
    name: 'WIP-Resteam-WIP',
    link: '/works/restream',
    image: '',
    text: 'some text',
  },
]

export default function Works() {
  const [clicked, setClicked] = useState<Number>()
  return (
    <Flex className={clicked !== undefined ? styles.clickedBox : styles.box}>
      {myProjects.map((project, idx) => (
        <>
          <Image
            key={idx}
            cursor="pointer"
            src={project.image ? project.image : '/noImage.webp'}
            borderRadius="8px"
            zIndex={2}
            className={
              (clicked === idx
                ? styles.opened
                : clicked !== undefined
                ? styles.closed
                : styles.default) + (project.image ? '' : ` ${styles.noImage}`)
            }
            onClick={() => setClicked(idx)}
          />
          <Text
            w="50%"
            className={
              clicked === idx
                ? styles.openedText
                : clicked !== undefined
                ? styles.closedText
                : styles.defaultText
            }
          >
            {project.text}
          </Text>
        </>
      ))}
    </Flex>
  )
}
