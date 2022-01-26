import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Box } from 'src/components/every-layout/box'
import {
  Template,
  TemplateHeader,
  TemplateMain,
  TemplateNavigation,
} from 'src/components/template'
import { useForm } from 'src/helpers/useForm'

const Home: NextPage = () => {
  const [form, setForm] = useForm({ search: '' })
  const router = useRouter()

  return (
    <Template>
      <TemplateNavigation>
        <Box>Navigation</Box>
      </TemplateNavigation>
      <TemplateMain>
        <Box>
          <div>another</div>
        </Box>
      </TemplateMain>
      <TemplateHeader>
        <Box>Header</Box>
      </TemplateHeader>
    </Template>
  )
}

export default Home
