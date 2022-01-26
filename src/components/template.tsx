import clsx from 'clsx'
import React from 'react'

export const Template: React.FC<{
  className?: string
  component?: string
}> = ({ className, component: Component = 'div' as any, children }) => (
  <Component className={clsx(`template`, className)}>
    {children}
    <style jsx>{`
      .template {
        position: relative;
        display: grid;
        min-height: 100vh;

        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        grid-template-areas:
          'header'
          'main'
          'footer';
      }
      @media screen and (min-width: 800px) {
        .template {
          grid-template-rows: auto 1fr;
          grid-template-columns: 2fr 5fr;
          grid-template-areas:
            'navigation header'
            'navigation main';
        }
      }

      @media screen and (min-width: 1400px) {
        .tempalate {
          grid-template-rows: auto 1fr;
          grid-template-columns: 300px 6fr 3fr;
          grid-template-areas:
            'navigation header .'
            'navigation main aside';
        }
      }
    `}</style>
  </Component>
)

export const TemplateHeader: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'div' as any,
}) => (
  <Component id="header">
    {children}

    <style jsx>{`
      #header {
        grid-area: header;
      }
    `}</style>
  </Component>
)

export const TemplateMain: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'main' as any,
}) => (
  <Component id="main">
    {children}

    <style jsx>{`
      #main {
        grid-area: main;
      }
    `}</style>
  </Component>
)

export const TemplateNavigation: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'aside' as any,
}) => (
  <Component id="navigation">
    {children}

    <style jsx>{`
      #navigation {
        grid-area: navigation;
      }
    `}</style>
  </Component>
)

export const TemplateAside: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'aside' as any,
}) => (
  <Component id="aside">
    {children}

    <style jsx>{`
      #aside {
        grid-area: aside;
      }
    `}</style>
  </Component>
)

export const TemplateFooter: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'div' as any,
}) => (
  <Component id="footer">
    {children}
    <style jsx>{`
      #footer {
        grid-area: footer;
      }
    `}</style>
  </Component>
)

export const TemplateToolbar: React.FC<{ component?: string }> = ({
  children,
  component: Component = 'footer' as any,
}) => (
  <Component id="toolbar">
    {children}
    <style jsx>{`
      #toolbar {
        grid-area: toolbar;
      }
    `}</style>
  </Component>
)
