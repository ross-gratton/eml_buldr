# Introduction
Ok this is a HTML email generator, it's been built because I saw too many issues with email generators that already exist. This generator aims to create bullet proof HTML emails. But if it doesn't, then all the insides are right there for you to tweak for you needs.

container.start.twig
	- outer_class
	- outer_attributes
	- class
	- attributes
	- top
	- module
	- thumb

container.end.twig
	- bottom

content.start.twig
	- width
	- height
	- top
	- left
	- right
	- outer_class
	- outer_attributes
	- class
	- attributes

content.spacer.twig
	- height
	- left
	- right
	- class
	- attributes
	- spacer_class
	- spacer_attributes

content.end.twig
	- left
	- right
	- bottom

column.collection.start.twig
	- class
	- attributes

column.start.twig
	- class
	- attributes
	- width

column.end.twig
	- gutter

hr.twig
	- top
	- bottom

image.twig
	- width
	- src
	- ext_src
	- class
	- attributes

link.twig
	- href
	- text
	- class
	- attributes

spacer.iso.twig
	- class
	- attributes
	- outer_class
	- outer_attributes

spacer.tr.twig
	- class
	- attributes
	- colspan
	- width
	- height
	- spacer_class
	- spacer_attributes

spacer.td.twig
	- class
	- attributes
	- cold-an
	- width
	- height
	- spacer_class
	- spacer_attributes

spacer.twig
	- width
	- height
	- class
	- attributes

button
	- top
	- bottom
	- left
	- right
	- outer_class
	- outer_attributes
	- class
	- attributes
	- link_class
	- link_attributes
	- href
	- text

bullet.collection.start.twig
	- class
	- attributes

bullet.start.twig
	- left
	- gutter
	- class
	- attributes
	- bullet_class
	- bullet_attributes

bullet.end.twig
	- right