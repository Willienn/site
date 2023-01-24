import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { useState } from 'react'
import Link from 'next/link'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

const myProjects = [
  { name: 'Aquarium', link: '/works/aquarium', image: null },
  { name: 'WIP-Win98Retroative-WIP', link: '/boot', image: null },
  { name: 'WIP-Reesteam-WIP', link: '/works/restream', image: null },
]

export default function Works() {
  const [clickedLink, setClickedLink] = useState('0')
  return (
    <>
      <Nav />
      <Flex gap="30px">
        {myProjects.map((project) => (
          <Link href={project.link}>
            <Box>
              <Image></Image>
              <Text>{project.name}</Text>
            </Box>
          </Link>
        ))}
      </Flex>
      <Footer />
    </>
  )
}
