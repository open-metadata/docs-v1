# Docs with Markdoc

To add content to the docs use markdown files. Some custom markdoc tags are listed below for adding content with predefined styling.

### How to use markdoc tags ?

Similar to the normal react components custom tags can be used as follow
Example: Here's how to use tag named 'exampleTag' with some attribute

```
{% exampleTag attributeName='value' %}   <!-- starting tag with attributes -->
This is content inside tag.
{% /exampleTag %}   <!-- closing tag -->
```

# Custom Tags

Here are the custom markdoc tags to use for desired functionalities.

## Tags for Code Preview Functionality

For showing code or commands with the explanations by side use following tags:-

- codePreview
- codeInfoContainer
- codeInfo
- codeBlock

### 1. codePreview

Its a container which will have two tags as child 'codeInfoContainer' and 'codeBlock'

### 2. codeInfoContainer

Container tag for all the 'codeInfo' tags

### 3. codeInfo

It's a tag for which will contain explanation or information about a chuck of code. Use as many tags as many steps you want inside the 'codeInfoContainer' tag.

#### Attributes -

1. srNumber (type - Number)
   It is the step number and the code chunk number you want to highlight for the given information.

### 4. codeBlock -

A container tag to enclose all the code chunks you will write for each steps given with 'codeInfo' tag. Make sure to maintain the same order you want 'codeInfo' tags to be associated with it.

Example:

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

##### Here's the preview of the Code Preview functionality

<img width="2032" alt="code-preview-component-gif" src="./public/code-preview-component.gif">

## Tags for Showing Step by Step Information

- stepsContainer
- step
- stepDescription
- stepVisualInfo

### 1. stepsContainer

A container to envelope all the tags for stepper functionality. Ensure to include only below tags inside this tag.

### 2. step

Use this tag to define the contents of a single step.

#### Attributes

1. srNumber (type - Number)
   It is the serial number of the step. It is used to identify which step to highlight with scrolling.

### 3. stepDescription

The description about the step. The title and the details about step should be included in this tag.
For defining title use 'title' attribute. Add other information between opening and closing tags.

#### Attributes

1. title (type - String)
   Title of the step.

### 4. stepVisualInfo

Use this tag to show images, videos, GIFs or CodeBlocks to provide additional information for the step.
Add the tags for images, videos, GIFs or CodeBlocks between opening and closing tags.

Example:

{% stepsContainer %}

{% step srNumber=1 %}

{% stepDescription title="Step1 Title" %}

Step 1 description

{% /stepDescription %}

{% stepVisualInfo %}

{% image
src="/step1-preview.png"
alt="step1"
caption="step1 caption" /%}

{% /stepVisualInfo %}

{% /step %}

{% step srNumber=2 %}

{% stepDescription title="Step2 Title" %}

Step 1 description

{% /stepDescription %}

{% stepVisualInfo %}

{% image
src="/step2-preview.png"
alt="step2"
caption="step2 caption" /%}

{% /stepVisualInfo %}

{% /step %}

{% /stepsContainer %}

<img width="2032" alt="image" src="./public/steps-preview.png">

##### Here's the preview of the Stepper functionality

<img width="2032" alt="steps-component-gif" src="./public/steps-component.gif">
