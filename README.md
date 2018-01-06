# Introduction
Ok this is a HTML email generator, it's been built because I saw too many issues with email generators that already exist. 

The main issues, and thus the reason for building this is, the majority of them don't support the depth of email clients that I aim to support and don't give me any way to rectify that.

This generator aims to create bullet proof HTML emails for a very deep client stack. But if it doesn't, then all the insides are right there for you to tweak for you needs.

This has been tested extensively in Litmus and currently supports **48 email clients** (it probably supports more but I haven't tested a bunch of really edge case ones).

## Methodology
Don't try and be fancy. Use techniques that work in the shittest browser and only revert to edge case 'modern' techniques when absolutely nesseccary.

This generator is essentially a series of Twig files that abstract away the need to write loads of HTML table markup. It's built on Gulp and compiles Twig files and SASS into HTML with inline styles and the required embedded responsive styles for your layout.

The tool has been specifically designed to follow a StampReady methodology, that is to say, you create isolated modules, (called patterns in the tool to prevent confusion). Drop a twig file into the `/patterns` directory and it'll be compiled into your email. The `container.start.twig` utility file can take a module name and thumbnail.

# Setup
Before you get started you will need to have the following installed:
- Nodejs
	- NPM
	- Gulp
- Ruby
	- Sass Gem

Once you have those head into `/app` and run
```
npm install
```

# Example Use



# Utilities
The following is a list of the available utilities and the properties you can pass through to them.

## Usage
As utilites are twig files, use as such:
```HTML
{% include "container.start.twig" with { outer_class: "bg--norway", outer_attributes: "valign='top'" } %}
```

The tool is bundles with a bunch of patterns for you to use in order to understand how to work with the utilities.

## Key Points
`outer_class|_attributes` adds to a containing table
`class|attributes` add to the td

e.g:
```TWIG
<table [outer_class] [outer_attributes]>
	<tr>
		<td [class] [attributes]>
```

### container.start.twig
```
outer_class: string
outer_attributes: string
class: string
attributes: string
top: number
module: string			// StampReady Module Name
thumb: string			// StampReady Module Thumb
```

### container.end.twig
```
bottom: number
```

### content.start.twig
```
width: number
height: number
top: number
left: number
right: number
outer_class: string
outer_attributes: string
class: string
attributes: string
```

### content.spacer.twig
```
height: number
left: number
right: number
class: string
attributes: string
spacer_class: string
spacer_attributes: string
```

### content.end.twig
```
left: number
right: number
bottom: number
```

### column.collection.start.twig
```
class: number
attributes: string
```

### column.start.twig
```
class: string
attributes: string
width: number
```

### column.end.twig
```
gutter: number
```

### hr.twig
```
top: number
bottom: number
```

### image.twig
```
width: number
src: string
ext_src: string
class: string
attributes: string
```

### link.twig
```
href: string
text: string
class: string
attributes: string
```

### spacer.iso.twig
```
class: string
attributes: string
outer_class: string
outer_attributes: string
```

### spacer.tr.twig
```
class: string
attributes: string
colspan: number
width: number
height: number
spacer_class: string
spacer_attributes: string
```

### spacer.td.twig
```
class: string
attributes: string
colspan: number
width: number
height: number
spacer_class: string
spacer_attributes: string
```

### spacer.twig
```
width: number
height: number
class: string
attributes: string
```

### button
```
top: number
bottom: number
left: number
right: number
outer_class: string
outer_attributes: string
class: string
attributes: string
link_class: string
link_attributes: string
href: string
text: string
```

### bullet.collection.start.twig
```
class: string
attributes: string
```

### bullet.start.twig
```
left: number
gutter: number
class: string
attributes: string
bullet_class: string
bullet_attributes: string
```

### bullet.end.twig
```
right: number
```