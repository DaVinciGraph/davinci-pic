# Introduction

The `davinci-pic` web component is designed to securely and effortlessly interface with the DavinciPic API. It fetches and displays images of Hedera-based entities, such as tokens, accounts, nodes, as well as logos for other networks and decentralized applications (dApps). To make it easier for users, these entities are loaded simply by specifying their network and address as attributes to the component. Additionally, it showcases liquidity pool (LP) and wrapped tokens when relevant references are available. Given that this component could be integrated into security-sensitive applications like digital wallets, it ensures secure data handling within the HTML. The component also offers a range of attributes for extensive customization. To optimize performance, it activates only when it enters the viewport, utilizing an intersection with a vertical margin of 200 pixels.

### Live Examples

Ready to see davinci-pic in action? Check out our [Live Examples](https://davincigraph.github.io/davinci-pic/) to explore various use-cases, complete with intentional delays to showcase loading and failure states.

## Note

**This component is intentionally not published as an npm package.** The primary reason for this decision is to provide an additional layer of security for applications that may use this component in sensitive contexts, such as cryptocurrency wallets. By directing users to download the component directly from this repository, we aim to build trust and assure users that the code is secure. All updates to the component will be announced and made available for download through this repository.

<br/>

# Installation

`davinci-pic` is compatible with vanilla JavaScript as well as other front-end frameworks like Angular and Vue.js. For React applications, use the DavinciPic React component.

### Typescript

1. Clone the repository, Copy the `src` directory and add it to your project (rename the directory to davinciPics).

### Javascript

1. Clone the repository and execute `npm run build:es` in the terminal.

2. Copy the dist/es directory and add it to your project (rename the directory to davinciPics).

### stand alone file

You may want to use davinci-pic with pure HTML/JS without any framework

1. Clone the repository and execute `npm run build` in the terminal.

2. Copy the standalone JavaScript file, add it to your project, and link to it from your HTML files.

## Angular

after adding the davinci-pic to your angular project you must make sure that your angular is configured to work with custom elements.

1. add `custom_elements_schema` to the angular modules in app.modules.ts

```javascript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA], // <================= make sure this line exists
})
```

2. import davinciPics file in the app.component.ts

```javascript
import "./davinciPics/index";
```

## Vue.js

1. import the davinciPics file in the main.js

```javascript
import "./components/davinciPics/index";
```

2. Exclude `davinci-pic` from component resolution via compilerOptions.isCustomElement, one way is to do this in your vue.config.js file:

```javascript
module.exports = defineConfig({
	...
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-loader")
			.tap((options) => {
				options.compilerOptions = {
					isCustomElement: (tag) => tag.startsWith("davinci-pic"),
				};
				return options;
			});
	},
});
```

<br/>

# Security Assurance

We understand that security is of utmost importance, particularly in applications that handle sensitive information. The davinci-pic custom element has been meticulously designed to ensure secure operations in two primary ways:

**API Requests:** The component makes GET requests to the DavinciPics API to fetch the relevant entity data. These requests are made using HTTPS to ensure data confidentiality and integrity during transmission. Additionally, all received data are strictly type-checked using TypeScript and type guards to prevent unexpected and potentially unsafe behavior.

**Data Rendering:** Once the data is received, it's injected into HTML templates via a safe method using setAttribute and element.textContent, rather than innerHTML, to avoid the risks associated with script injection attacks.

All of these actions are encapsulated within the component, and at no point does the component execute arbitrary or unsafe code.

We are committed to maintaining this high level of security in all future updates. Should you have any questions or concerns about security, we welcome your input and feedback.

<br/>

# Basic Usage

Define the type, specify the network and address, you are good to go.

```HTML
<davinci-pic type="token" network="hedera" address="hbar"></davinci-pic>
<davinci-pic type="token" network="hedera" address="0.0.2997829"></davinci-pic>
<davinci-pic type="profile" network="hedera" address="0.0.1518714"></davinci-pic>
<davinci-pic type="banner" network="hedera" address="0.0.1518714"></davinci-pic>
<davinci-pic type="node" network="hedera" address="0.0.9"></davinci-pic>
<davinci-pic type="network" network="ethereum"></davinci-pic>
<davinci-pic type="app" name="saucerswap"></davinci-pic>
```

<br/>

## Glossary

-   **Complex Tokens**: In the scope of Davincigraph, "Complex Tokens" refers to LP (Liquidity Pool) and Wrapped tokens. These tokens are considered "complex" because their existence is predicated on other underlying tokens.

-   **Context**: The term "Context" relates to the origin of a token. Specifically, it refers to the network from which a token originates. In the case of Complex Tokens, the context also includes the application responsible for originating the token.

<br/>

# Attributes

mandatory fields are marked by asterisk symbol:

| Attribute            | Type                                                | Applying to                         |
| -------------------- | --------------------------------------------------- | ----------------------------------- |
| type\*               | [PicsType](#picstype)                               | All                                 |
| network\*            | string                                              | All except type "app"               |
| address\*            | string                                              | All except type "network" and "app" |
| name\*               | string                                              | Only applies to type "app"          |
| data-title           | string                                              | All                                 |
| data-pic-url         | string                                              | All                                 |
| context              | [PicsContextType](#picscontexttype)                 | Only applies to type "token"        |
| context-position     | [PicsContextPositionType](#picscontextpositiontype) | Only applies to type "token"        |
| data-context-title   | string                                              | only applies to type "token"        |
| data-context-pic-url | string                                              | only applies to type "token"        |
| complex-token-type   | "lp" or "wrapped"                                   | only applies to type "token"        |
| offline-mode         | boolean                                             | All                                 |
| size                 | number                                              | All except type "banner"            |
| shape                | [PicsShapeType](#picsshapetype)                     | Has no effect of complex tokens     |
| stroke-width         | number                                              | All except type "banner"            |
| stroke-color         | string                                              | All except type "banner"            |
| placeholder          | string                                              | All                                 |
| loading-effect       | string                                              | All                                 |
| failure-effect       | string                                              | All                                 |
| censor               | [PicsSensitivityType](#picssensitivitytype)         | All                                 |
| delay-response-time  | number                                              | All                                 |

## type

The type attribute specifies the kind of entity that the davinci-pic component should load. It accepts one of several predefined string values, each corresponding to a different type of entity.

### Accepted Values:

**token:** Chooses a token or a cryptocurrency.<br/>
**profile:** Chooses a profile picture, commonly used for user avatars or identities.<br/>
**banner:** Specifies a banner image associated with a Hedera account, often used for headings or decorative profiles.<br/>
**node:** Relates to a Hedera node.<br/>
**network:** Chooses an image that represents an entire network, such as a Hedera.<br/>
**app:** Selects an application's logo.

By setting the type attribute, you instruct the `davinci-pic` component on what kind of image it should load and display.

## network

The network attribute identifies the blockchain or network to which the entity belongs. It accepts string values representing well-known networks such as "hedera", "ethereum", or "binance".

### Applicability:

This attribute is applicable to all entity types except for "app", as apps are considered network-agnostic. In other words, when the type attribute is set to "app", the network attribute will not have any effect.

By specifying the network attribute, you can ensure that the davinci-pic component loads the correct entity belonging to the designated network.

## address

The address attribute specifies the unique identifier for the entity, conforming to the address format of the specified network. Here's how different network addresses can be represented:

**Hedera:** Addresses are typically in the format "0.0.x", where x is a number.<br/>
**Ethereum:** Addresses usually start with "0x" followed by a series of alphanumeric characters.<br/>
...

> For network-native currencies like HBAR on Hedera or Ether on Ethereum, you can simply use the currency symbol (e.g., "hbar", "eth", "btc", "bnb") as the address.

### Examples

```HTML
<davinci-pic type="token" network="hedera" address="hbar"></davinci-pic>
<davinci-pic type="token" network="hedera" address="0.0.2997829"></davinci-pic>
<davinci-pic type="token" network="ethereum" address="0xdAC17F958D2ee523a2206206994597C13D831ec7"></davinci-pic>
```

## name

The `name` attribute is specifically designed for use when the `type` attribute is set to `app`. It serves as an identifier to fetch the appropriate entity from the API. The value you provide for name will be used in the API request to uniquely identify and retrieve the corresponding app entity. This attribute is ignored for other types of entities.

```HTML
<davinci-pic type="app" name="saucerswap"></davinci-pic>
<davinci-pic type="app" name="hashport"></davinci-pic>
```

## data-title

The `data-title` attribute allows you to manually set a title that appears when the user hovers over the element. This alternative title will only be used if the returned entity lacks an associated title.

**For single tokens or entities:** You can provide a single title.<br/>
**For LP (Liquidity Provider) tokens:** If you know the token is an LP token comprised of two different assets, you can provide both titles separated by a pipe symbol (|).

## data-pic-url

The data-pic-url attribute allows you to provide an alternative image URL for the entity displayed. This alternative image will only be used if the returned entity lacks an associated picture.

**For individual entities or tokens:** Supply the URL of the backup image.<br/>
**For LP (Liquidity Provider) tokens:** If you know that the token is a liquidity provider token composed of two different assets, you can specify both image URLs, separated by a pipe symbol (|).

```HTML
<davinci-pic type="token" network="hedera" address="hbar" data-title="HBAR" data-pic-url="...relative/absolute path..."></davinci-pic>
<davinci-pic type="token" network="hedera" address="0.0.1062796" data-title="token0Title|token1Title" data-pic-url="token0Url|token1Url"></davinci-pic>
```

## context

The context attribute is used exclusively when the type attribute is set to "token." It specifies what kind of additional image should accompany the main token image as a smaller circle. This attribute accepts one of three specific values:

**"network":** If set, a smaller circle displaying the network logo (e.g., Hedera, Ethereum) will appear beside the primary token image.<br/>
**"app":** If set, the smaller circle will show the logo or icon of the application associated with the token.<br/>
**"none":** When set to "none," no additional image will be shown; only the primary token image will be displayed.

The smaller circle provides a visual cue, giving more information about the origin or the nature of the token being displayed.

## context-position

The context-position attribute allows you to specify the location of the context picture within the main picture frame. This attribute is particularly useful when you want to control the placement of the additional contextual image (like a network or app logo) relative to the main token image.

Accepted values for this attribute are:

**"bottomRight":** Places the context picture at the bottom-right corner of the main picture frame.<br/>
**"bottomLeft":** Places the context picture at the bottom-left corner of the main picture frame.<br/>
**"topRight":** Places the context picture at the top-right corner of the main picture frame.<br/>
**"topLeft":** Places the context picture at the top-left corner of the main picture frame.<br/>

## data-context-title

The `data-context-title` attribute functions similarly to the `data-title` attribute, but it specifically applies to the context title. This means that the title specified using `data-context-title` will appear as a tooltip when the user hovers their cursor over the smaller context picture, such as a network or app logo.

This can be useful for providing additional information or clarification about the context of the token, especially when the image alone may not convey the full meaning.

## data-context-pic-url

The `data-context-pic-url` attribute serves a similar purpose to the `data-pic-url` attribute, but it specifically targets the context picture. If you have a local image that you'd like to display as the context picture (e.g., a network or app logo), you can specify its URL using this attribute. This way, the specified image will be loaded as the context picture if the API doesn't provide one.

## complex-token-type

The `complex-token-type` attribute allows you to explicitly specify the type of a complex token, which could either be a Liquidity Pool (LP) token or a Wrapped token. This is particularly useful for customizing the loading and failure templates of the component, as the actual type of complex tokens is generally not known until the API response is received. Acceptable values for this attribute are `lp` for Liquidity Pool tokens and `wrapped` for Wrapped tokens.

By setting this attribute, you can ensure that the loading and failure templates are appropriately tailored even before the API response arrives.

## offline-mode

The `offline-mode` attribute enables the component to operate without making any API calls. When this mode is activated, the component will immediately load any alternative data provided via other attributes, such as `data-pic-url` or `data-title`, without attempting to fetch data from the API.

## size

The size attribute sets the dimensions of the image, rendering it as a square. The value should be specified in pixels, such as "48". By default, the size is set to "100" pixels. This attribute is not applicable when the type is set to "banner."

## shape

The shape attribute allows you to define the geometric form of the displayed picture. Accepted values include:

**circle:** Renders the picture in a circular shape.<br/>
**square:** Displays the picture as a square with sharp corners.<br/>
**smoothSquare:** Renders the picture as a square with slightly rounded corners.

> has no effects on complex and contextual tokens which always will be shown in a circular shape.

## `stroke-width` and `stroke-color`

These attributes control the stroke appearance around the shape involved in the image. The `stroke-width` attribute specifies the width of the stroke in pixels, while the `stroke-color` attribute defines its color. Note that these attributes do not apply when the type is set to `banner`. Also they won't affect during loading phase or failed scenarios.

## placeholder

The `placeholder` attribute serves as a flexible variable that can be used in conjunction with the `loading-effect` and `failure-effect` attributes. It accepts both predefined and dynamic values, which may vary depending on the type of entity specified.

### Common Values:

**`transparent`:** Sets the background of the involved shapes to be transparent.<br/>
**`randomColor`:** Generates a random color for the background of the involved shapes.<br/>
**Fixed Color:** Allows you to specify a fixed color using a hex code (e.g., #FF5733) or an RGB value (e.g., rgb(255, 87, 51)) to be shown as the background of the involved shapes.<br/>
**Picture URL:** Allows you to specify an image URL using the url() format (e.g., url(http://example.com/image.jpg)).

```HTML
<davinci-pic type="token" network="hedera" addrss="hbar" placeholder="transparent"></davinci-pic>
<davinci-pic type="token" network="hedera" addrss="hbar" placeholder="randomColor"></davinci-pic>
<davinci-pic type="token" network="hedera" addrss="hbar" placeholder="#ccc"></davinci-pic>
<davinci-pic type="token" network="hedera" addrss="hbar" placeholder="url('http://... or ./image/...')"></davinci-pic>
```

### Type-Specific Values:

_Common to All Types Except 'Banner':_

**`default`:** Uses the default "no logo" picture.<br/>
**`defaultBright`:** Uses a brighter variant of the default "no logo" picture.<br/>
**`defaultDark`:** Uses a darker variant of the default "no logo" picture.<br/>

<br/>

_Common to All Types Except 'Banner' and 'Profile':_

**`questionMarkBright`:** Displays a bright question mark symbol.<br/>
**`questionMark`:** Displays a standard question mark symbol.<br/>
**`questionMarkDark`:** Displays a dark question mark symbol.<br/>
**`exclamationMarkBright`:** Displays a bright exclamation mark symbol.<br/>
**`exclamationMark`:** Displays a standard exclamation mark symbol.<br/>
**`exclamationMarkDark`:** Displays a dark exclamation mark symbol.<br/>

### predefined values table

| value                 | On Profile                                                                                       | On Others Except 'banner'                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| default               | <img src="https://arweave.net/qsn_zIlG_7_Ob4_qS6Bpc8vLEc5bPScw6JMly_shxlk" width="48" height=48> | <img src="https://arweave.net/wW4bp6129XobnasaZbDB4RxdnpipGR8XyK0tUXGiVL0" width="48" height=48> |
| defaultBright         | <img src="https://arweave.net/WxLlax6NBCapLUuKcuy-wvLlKLBTqxTV40yJt7Yc26Q" width="48" height=48> | <img src="https://arweave.net/ZAMK4tuU1MZ9TkNl2ARV2QDRumGT5Yxw13uCpW3kX6w" width="48" height=48> |
| defaultDark           | <img src="https://arweave.net/ZHWeQz5R6VHBHOg6eOGekMsudTyy7uNBdnrul5gIIu0" width="48" height=48> | <img src="https://arweave.net/j5B7_CYAOdrk6YJNVeJMeOHn4HbySsgkObUSfpvUuDA" width="48" height=48> |
| questionMarkBright    |                                                                                                  | <img src="https://arweave.net/z-5G9bNj_gisiQhVECwaUdSzuXMxl9Gi9UxYqrwUrq4" width="48" height=48> |
| questionMark          |                                                                                                  | <img src="https://arweave.net/u9t3--97iFNeFB4XaX7auIdcJWjNWF090BFcJdnBmiQ" width="48" height=48> |
| questionMarkDark      |                                                                                                  | <img src="https://arweave.net/HDVERv0ghkA91qhI2ud7qVUU_FFtAIyYELHHxQ9t2BQ" width="48" height=48> |
| exclamationMarkBright |                                                                                                  | <img src="https://arweave.net/HS0RGj5YSKgcNch2US1E8saZKdM8RGlQWpxwhk5eKrk" width="48" height=48> |
| exclamationMark       |                                                                                                  | <img src="https://arweave.net/KwbKX4FOOM59KmFrAvtRhr5U-8MqWsSzU0rSA3Z7Z4A" width="48" height=48> |
| exclamationMarkDark   |                                                                                                  | <img src="https://arweave.net/A3Ja0tV3kU6EhVvN1EQejG-kmtY_yEcbgQ6pShYRXHo" width="48" height=48> |

## loading-effect

The `loading-effect` attribute takes effect immediately when the component enters the viewport and continues until a response is received from the API. It offers various options to customize the visual behavior of the component during the loading stage:

**`hide:`** Hides the component.<br/>
**`transparent:`** Makes the component transparent.<br/>
**`placeholder:`** Displays the placeholder whether it's a color or picture.<br/>
**`randomColor:`** Fills the component with a randomly generated color.<br/>
**Fixed Color:** You can specify a fixed color in the format of #... or rgb() for the shapes background.<br/>
**Picture URL:** Uses a picture from a URL as the filling picture of the shapes. Format: url(theUrl).<br/>
**`pulse:placeholder:`** Displays the placeholder as pulsing.<br/>
**`pulse:randomColor:`** Displays the randomly generated color as pulsing.<br/>
**pulse:Fixed color:** Displays the fixed color as pulsing.<br/>

The "pulse:" prefix creates a pulsating effect for the option that follows it, adding a dynamic visual transition during the loading phase.

## failure-effect

The failure-effect attribute comes into play when an API request fails and there's insufficient local data to display the picture. This attribute allows you to define how the component should behave under such circumstances. It accepts the following values:

**hide:** Hides the component.<br/>
**transparent:** Makes the component transparent.<br/>
**placeholder:** Displays a placeholder based on the strategy defined in the placeholder attribute.<br/>

If you choose "placeholder," the specific graphic or color that appears will be determined by the configuration set in the placeholder attribute. This ensures a consistent visual experience even when data retrieval is unsuccessful.

## censor

The censor attribute allows you to blur images that violate `davinci-pic`'s policies, which are still under development. These policies will target images based on their levels of sensitivity. When finalized, the policies will have three categories:

**sensitive:** Least severe. Blurs images flagged as sensitive.<br/>
**inappropriate:** Moderate severity. Blurs images flagged as inappropriate or more severe.<br/>
**copyright-violated:** Most severe. Blurs images flagged as violating copyright.

Setting this attribute to a particular level will also consider all classes following that level as censored. For example, if you set censor="inappropriate", the component will blur images flagged as "inappropriate" as well as those flagged as `copyright-violated`.

The default value for this attribute is `copyright-violated`.

## delay-response-time

The delay-response-time attribute is designed primarily for testing and demonstration purposes. It introduces a deliberate delay during the loading phase of the component. The delay duration is specified in milliseconds.

## Attributes Types

### PicsType

```typescript
type PicsType = "token" | "profile" | "banner" | "node" | "network" | "app";
```

### PicsContextType

```typescript
type PicsContextType = "none" | "app" | "network";
```

### PicsContextPositionType

```typescript
type PicsContextPositionType = "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
```

### PicsSensitivityType

```typescript
type PicsSensitivityType = "safe" | "sensitive" | "inappropriate" | "copyright-violated";
```

### PicsShapeType

```typescript
type PicsShapeType = "circle" | "square" | "smoothSquare";
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
