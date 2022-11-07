import { Box, Flex, Input } from '@chakra-ui/react'
import React from 'react'

export default function Search() {
  return (
    <Flex bgColor='#0d0d0d' w='100vw' h='50px' px='25px' align='center' justify='space-between'>
<Box>Sua Loja</Box>
<Box>Novidades e tendências</Box>
<Box>Categorias</Box>
<Box>Loja de pontos</Box>
<Box>Notícias</Box>
<Box>Laboratório</Box>
<Input w='100px' placeholder='Buscar' ></Input>

    </Flex>
  )
}
