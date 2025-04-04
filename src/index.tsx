import * as React from 'react';
import deepmerge from 'deepmerge';
import { Components } from 'react-markdown';
import {
  Code,
  Heading,
  Link,
  ListItem,
  ListRoot,
  TableBody,
  TableCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';

type GetCoreProps = {
  children?: React.ReactNode;
  'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}

interface Defaults extends Components {
  /**
   * @deprecated Use `h1, h2, h3, h4, h5, h6` instead.
   */
  heading?: Components['h1'];
}

export const defaults: Defaults = {
  p: props => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  em: props => {
    const { children } = props;
    return <Text as="em">{children}</Text>;
  },
  blockquote: props => {
    const { children } = props;
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    );
  },
  code: props => {
    const { inline, children, className } = props;

    if (inline) {
      return <Code p={2} children={children} />;
    }

    return (
      <Code
        className={className}
        whiteSpace="break-spaces"
        display="block"
        w="full"
        p={2}
        children={children}
      />
    );
  },
  del: props => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  /*  hr: props => {
    return <Divider />;
  },*/
  a: Link,
  img: Image,
  text: props => {
    const { children } = props;
    return <Text as="span">{children}</Text>;
  },
  ul: props => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = ListRoot;
    let styleType = 'disc';
    if (ordered) {
      Element.defaultProps = { as: 'ol' };
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  ol: props => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = ListRoot;
    let styleType = 'disc';
    if (ordered) {
      Element.defaultProps = { as: 'ol' };
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return (
      <Element
        spacing={2}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  li: props => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox.Root checked={checked} readOnly>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>{children}</Checkbox.Label>
        </Checkbox.Root>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? 'none' : 'inherit'}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  heading: props => {
    const { level, children } = props;
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    return (
      <Heading
        my={4}
        as={`h${level}`}
        size={sizes[`${level - 1}`]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  pre: props => {
    const { children } = props;
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
  },
  table: TableRoot,
  thead: TableHeader,
  tbody: TableBody,
  tr: props => <TableRow>{props.children}</TableRow>,
  td: props => <TableCell>{props.children}</TableCell>,
  th: props => <TableHeader>{props.children}</TableHeader>,
};

export default function ChakraUIRenderer(
  theme?: Defaults,
  merge = true,
): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

/* ChakraUIRenderer;*/
