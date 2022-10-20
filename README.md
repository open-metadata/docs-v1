# Docs with Markdoc

To add content to the docs use markdown files. Some custom markdoc tags are listed below for adding content with predefined styling.

### How to use markdoc tags ?

Similar to the normal react components custom tags can be used as follow
Ex. Here's how to use tag named 'exampleTag' with some arguments

{% exampleTag argumentName='value' %} <!-- starting tag with arguments -->
This is content inside tag.
{% /exampleTag %}<!-- closing tag -->

## Custom Tags

For showing code or commands with the explainations by side use following tags:-

- codePreview
- codeInfoContainer
- codeInfo
- codeBlock

### 1. codePreview

Its as container which will have two tags as child 'codeInfoContainer' and 'codeBlock'

### 2. codeInfoContainer

Container tag for all the 'codeInfo' tags

### 3. codeInfo

It's a tag for which will contain explaination or information about a chuck of code. Use as many tags as many steps you want inside the 'codeInfoContainer' tag.

#### Arguments -

1. srNumber (type - Number)
   It is the step number and the code chunk number you want to highlight for the given information.

### 4. codeBlock -

A container tag to enclose all the code chunks you will write for each steps given with 'codeInfo' tag. Make sure to maintain the same order you want 'codeInfo' tags to be associated with it.

Ex.

{% codePreview %}

{% codeInfoContainer %}

{% codeInfo srNumber=1 %}
Information about 1st code chunk.
{% /codeInfo %}

{% codeInfo srNumber=2 %}
Information about 2nd code chunk
{% /codeInfo %}

{% codeInfo srNumber=3 %}
Information about 3rd code chunk
{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock %}

```bash
Code for first codeInfo tag
```

```bash
Code for second codeInfo tag
with 3 lines
print('Hello world!')
```

```bash
Code for third codeInfo tag
```

{% /codeBlock %}

{% /codePreview %}

<img width="2032" alt="image" src="./public/codePreview.png">
