# How to run locally?

1. Clone the repository 
2. Run `yarn` to install all the required packages.
3. Run `yarn dev` to start server for development mode.

# Change the default version

Refer [this](https://github.com/open-metadata/docs-v1/pull/135) PR to change the default version for the `version selector` on the top navigation bar

# Docs with Markdoc

To add content to the docs use markdown files. Some custom markdoc tags are listed below for adding content with predefined styling.

### How to use markdoc tags ?

Similar to the normal react components, custom tags can be used as follows
Example: Here's how to use tag named 'exampleTag' with some attributes

```
{% exampleTag attributeName="value" %}   <!-- starting tag with attributes -->
This is content inside tag.
{% /exampleTag %}   <!-- closing tag -->
```

**Note** that for passing the values in string type attribute, always use **Double Quotes** (`"`) and not Single Quotes (`'`) as it's done in the above example

# Custom Tags

Here are the custom markdoc tags to use for desired functionalities.

### extraContent

Tag to add some extra information in between two steps. This tag can be used inside either the `codePreview` tag or the `stepsContainer` tag. To use it inside above tags, add it in between two `codeInfo` or `step` tags respectively. More detailed examples to use `extraContent` are given below, in the above mentioned tags sections.

#### Attributes

1. parentTagName (type - String)
   The name of the tag you are using it in. For example 'codePreview' or 'stepsContainer'

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
   
**Note: srNumber is also a unique id to identify a code block. Make sure that you have srNumber values unique on a single page. That is even if multiple codePreview components are used in a page, the srNumbers should all be unique and should not repeat on a single page.**

### 4. codeBlock -

A container tag to enclose all the code chunks you will write for each steps given with 'codeInfo' tag. Make sure to maintain the same order you want 'codeInfo' tags to be associated with it.

#### Attributes - 

1. fileName (type - String)
   This is an optional argument. Pass the name of the file in which the code given inside the `codeBlock` tag is supposed to be.

2. theme (type - String)
   This is an optional argument to choose the color theme for the code block.
   Available options are 'gray', 'light' and 'default'

#### code/fence node (```)

Please make sure to pass an argument **srNumber** to the code node to link with the respective codeInfo section. This will determine which code block to highlight for which codeInfo section.
Here is how you can pass the argument:

\`\`\`bash {% srNumber=1 %}
print('hello!')
\`\`\`

Example:

{% codePreview %}

{% codeInfoContainer %}

{% codeInfo srNumber=1 %}
Information about 1st code chunk.
{% /codeInfo %}

{% extraContent parentTagName="codePreview" %}
Some extra information
{% /extraContent %}

{% codeInfo srNumber=2 %}
Information about 2nd code chunk
{% /codeInfo %}

{% codeInfo srNumber=3 %}
Information about 3rd code chunk
{% /codeInfo %}

{% /codeInfoContainer %}

{% codeBlock fileName="sample.txt" %}

\`\`\`bash {% srNumber=1 %}
Code for first codeInfo tag
\`\`\`

\`\`\`bash
Code without reference
\`\`\`

\`\`\`bash {% srNumber=2 %}
Code for second codeInfo tag
with 3 lines
print('Hello world!')
\`\`\`

\`\`\`bash {% srNumber=3 %}
Code for third codeInfo tag
with 4 lines
print('Hello There')
print('This is block 3')
\`\`\`

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

{% extraContent parentTagName="stepsContainer" %}

Additional information between two steps

{% /extraContent %}

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

## APIs & SDKs page tags

Use following 4 tags to achieve the API page layout and functionalities.

### 1. apiPageContainer

A container tag to wrap all the content tags for API page layout.

### 2. apiInfoContainer

A container tag to envelop "apiVisualInfo" and "apiDescription" tags

### 3. apiVisualInfo

A tag to display visual information about APIs. May contain an Image or a code block.

### 4. apiDescription

A tag to show description about the API.

Example:

{% apiPageContainer %}

{% apiInfoContainer %}

{% apiDescription %}

\#\# Title 1
API description

{% /apiDescription %}

{% apiVisualInfo %}

{% codeBlock fileName="open.json" %}

```
This is a new code
```

{% /codeBlock %}

{% /apiVisualInfo %}

{% /apiInfoContainer %}

{% apiInfoContainer %}

{% apiDescription %}

\#\#\# SubTitle
API description 2

{% /apiDescription %}

{% apiVisualInfo %}

{% codeBlock fileName="open.json" theme="light" %}

```
This is a new code
```

{% /codeBlock %}

{% /apiVisualInfo %}

{% /apiInfoContainer %}

{% apiInfoContainer %}

{% apiDescription %}

\#\# Title 2
API description 2

{% /apiDescription %}

{% apiVisualInfo %}

{% codeBlock fileName="open.json" theme="gray" %}

```
This is a new code
```

{% /codeBlock %}

{% /apiVisualInfo %}

{% /apiInfoContainer %}

{% /apiPageContainer %}

<img width="2032" alt="api-page-tags" src="./public/api-page-tags.png">

### Preview of API page

<img width="2032" alt="steps-component-gif" src="./public/code-lang-selector-preview.gif">

## Other Tags

### 1. partial

The partial tag helps in reducing the repetition in the content. If a set of lines are being used in multiple pages, you can use this tag to prevent adding same lines in multiple files.
**You can also pass variables for some varying content. Learn more about that [here](https://markdoc.dev/docs/partials#passing-variables)**

#### Steps to use

1. Add the repeating content in a file inside **"content/partials"** folder. You can also add nested structure inside the "partials" folder.
Lets say you created a file named 'test.md' inside a path `content/partials/folder1/folder2` with content -

```
### repeating line

This is the repeating line 1

This is the repeating line 2
```

2. Now just use the partial tag in some other file like this
```
# This is the parent file

{% partial file="/folder1/folder2/test.md" /%}

and some other content
```

And this is how the parent file will render 

<img width="2032" alt="partial-tag-example" src="./public/partial-tag-example.png">

### 2. note

A tag for highlighting some part of the content.

#### Attributes

1. noteType (type - String)
   Mention the type of note you want to show. There are 3 types of note which differ in styling.

**If no attribute is passed then the default type will be considered as "Note"**

Example:

- Note

{% note noteType="Note" %}
A Note
{% /note %}

**OR**

{% note %}
A Note
{% /note %}

<img width="2032" alt="note-tag-img" src="./public/note-tag.png">

- Warning

{% note noteType="Warning" %}
A Warning
{% /note %}

<img width="2032" alt="warning-tag-img" src="./public/warning-tag.png">

- Tip

{% note noteType="Tip" %}
A Tip
{% /note %}

<img width="2032" alt="tip-tag-img" src="./public/tip-tag.png">

### 3. codeWithLanguageSelector

A tag to display specific code snippets with the selected language from the given language options.
Include code snippets for all the languages given in the `languagesArray` inside the opening and closing tag with proper syntax as given in the example below.

#### Attributes

1. title (type - String)
   Title to show for the language selector component.

2. languagesArray (type - Array<string>)
   An array of language codes. This array will determine how many and what tabs to display for selection. Use similar 'language codes' that are used for highlighting the code in the markdown fence nodes.
   example: java, python, javascript, json, etc.

3. id (type - String)
   Id should be unique for all the 'codeWithLanguageSelector' tags within a single page.

4. theme (type - String)
   This is an optional argument to choose the color theme for the code block.
   Available options are 'gray', 'light' and 'default'

Example:

{% codeWithLanguageSelector title="The Title" id="container-1" languagesArray=["json","python","java","bash"] theme="light" %}

\`\`\`json
{
  "a": {
    "c": "open",
    "num": 5,
    "val": false
  }
}
 \`\`\` 

\`\`\`python
def my_function():
  print("Hello world!")
 \`\`\` 

\`\`\`java
public class Main {
  static void myMethod() {
    System.out.print("Hello world!")
  }
}
 \`\`\` 

\`\`\`bash
curl https://google.com -a
 \`\`\` 

{% /codeWithLanguageSelector %}

#### Images of `codeWithLanguageSelector` tag with different themes

1. Default

<img width="2032" alt="code-lang-selector-default-img" src="./public/code-lang-selector-default.png">

2. Light

<img width="2032" alt="code-lang-selector-light-img" src="./public/code-lang-selector-light.png">

3. Gray

<img width="2032" alt="code-lang-selector-gray-img" src="./public/code-lang-selector-gray.png">