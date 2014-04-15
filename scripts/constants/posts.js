angular.module('MyApp')
  .constant('Posts', {
    "backend": {
      "beginner": [
        {
          "title": "Parsing XML",
          "slug": "parsing-xml",
          "file": "backend/beginner/parsing-xml.md",
          "description": "Learn how to parse XML documents and turn them into JavaScript objects"
        },
        {
          "title": "String Manipulation",
          "slug": "string-manipulation",
          "file": "backend/beginner/string-manipulation.md",
          "description": "Using Case and underscore.string utilities for general purpose string manipulation"
        },
        {
          "title": "Parsing Query String, POST and URL Parameters",
          "slug": "parsing-query-string-post-and-url-parameters",
          "file": "backend/beginner/parsing-query-string-post-and-url-parameters.md",
          "description": "Learn how to parse user input like example.com?q=hello, data sent via AJAX request or route parameters like /posts/:id"
        },
        {
          "title": "Introduction to Jade",
          "slug": "introduction-to-jade",
          "file": "backend/beginner/introduction-to-jade.md",
          "description": "Brief crash course into Jade templating language"
        },
        {
          "title": "Handling Submitted Form Fields",
          "slug": "handling-submitted-form-fields",
          "file": "backend/beginner/handling-submitted-form-fields.md",
          "description": "Learn how to POST forms in Express"
        },
        {
          "title": "Useful Node.js Utilities",
          "slug": "useful-nodejs-utilities",
          "file": "backend/beginner/useful-nodejs-utilities.md",
          "description": "List of awesome Node.js libraries that make you more productive"
        },
        {
          "title": "Socket.IO Basics",
          "slug": "socketio-basics",
          "file": "backend/beginner/socketio-basics.md",
          "description": "A brief introduction to Socket.IO"
        },
        {
          "title": "Getting Started with Mongoose",
          "slug": "getting-started-with-mongoose",
          "file": "backend/beginner/getting-started-with-mongoose.md",
          "description": "A brief introduction to Mongoose"
        },
        {
          "title": "Node.js Logging",
          "slug": "nodejs-logging",
          "file": "backend/beginner/nodejs-logging.md",
          "description": "Prettify your console.log messages"
        },
        {
          "title": "Using Sass and LESS in Express",
          "slug": "using-sass-and-less-in-express",
          "file": "backend/beginner/using-sass-and-less-in-express.md",
          "description": "Using LESS and/or Sass stylesheets in your application"
        },
        {
          "title": "Formatting Dates",
          "slug": "formatting-dates",
          "file": "backend/beginner/formatting-dates.md",
          "description": "Learn how to parse, validate and format dates using moment.js"
        }
      ],
      "intermediate": [
        {
          "title": "Who is Online with Socket.IO",
          "slug": "who-is-online-with-socketio",
          "file": "backend/intermediate/who-is-online-with-socketio.md",
          "description": "Display how many users are online in real-time"
        },
        {
          "title": "Building a REST API",
          "slug": "building-a-rest-api",
          "file": "backend/intermediate/building-a-rest-api.md",
          "description": "Build a REST API using Node.js, Express and MongoDB"
        },
        {
          "title": "Form Validation",
          "slug": "form-validation",
          "file": "backend/intermediate/form-validation.md",
          "description": "Validating forms, or how not to trust the client with data input"
        },
        {
          "title": "Uploading Files",
          "slug": "uploading-files",
          "file": "backend/intermediate/uploading-files.md",
          "description": "File upload with a progress bar"
        },
        {
          "title": "Gravatar Profile Images",
          "slug": "gravatar-profile-images",
          "file": "backend/intermediate/gravatar-profile-images.md",
          "description": "Obtaining Gravatar images from user's e-mail address"
        },
        {
          "title": "Sign in with Facebook",
          "slug": "sign-in-with-facebook",
          "file": "backend/intermediate/sign-in-with-facebook.md",
          "description": "Simple Facebook authentication with Passport.js"
        },
        {
          "title": "CSRF Protection with Express",
          "slug": "csrf-protection-with-express",
          "file": "backend/intermediate/csrf-protection-with-express.md",
          "description": "Add cross-site request forgery protection to your Express app"
        },
        {
          "title": "Optimizing Assets with Gulp",
          "slug": "optimizing-assets-with-gulp",
          "file": "backend/intermediate/optimizing-assets-with-gulp.md",
          "description": "Using Gulp to optimize, concatenate, minify your assets and source files"
        },
        {
          "title": "Sending Emails with Nodemailer",
          "slug": "sending-emails-with-nodemailer",
          "file": "backend/intermediate/sending-emails-with-nodemailer.md",
          "description": "Easy as cake e-mail sending from your Node.js applications using Nodemailer"
        },
        {
          "title": "Get User's Location from IP Address",
          "slug": "get-users-location-from-ip-address",
          "file": "backend/intermediate/get-users-location-from-ip-address.md",
          "description": "Determine geolocation coordinates from an IP Address"
        }
      ],
      "advanced": [
        {
          "title": "Organizing Callbacks with Async",
          "slug": "organizing-callbacks-with-async",
          "file": "backend/advanced/organizing-callbacks-with-async.md",
          "description": "Learn about series, parallel, waterfall and other control flows to help you organize callbacks"
        },
        {
          "title": "Node.js Error Handling",
          "slug": "nodejs-error-handling",
          "file": "backend/advanced/nodejs-error-handling.md",
          "description": "Best practices for dealing with errors in Node.js"
        },
        {
          "title": "Generating Short Hashes (like YouTube and Bitly)",
          "slug": "generating-short-hashes",
          "file": "backend/advanced/generating-short-hashes.md",
          "description": "Learn how to create unique short hashes like b9iLXiAa or Aaco9cy5."
        }
      ]
    },
    "frontend": {
      "beginner": [
        {
          "title": "Typeahead",
          "slug": "typeahead",
          "file": "frontend/beginner/typeahead.md",
          "description": "Using Typeahead to provide search results as you type"
        },
        {
          "title": "Color Selector",
          "slug": "color-selector",
          "file": "frontend/beginner/color-selector.md",
          "description": "Creating a color picker dropdown"
        },
        {
          "title": "Comparing Icon Fonts",
          "slug": "comparing-icon-fonts",
          "file": "frontend/beginner/comparing-icon-fonts.md",
          "description": "Comparison of popular icon fonts"
        },
        {
          "title": "Activate Bootstrap Dropdown on Hover",
          "slug": "activate-bootstrap-dropdown-on-hover",
          "file": "frontend/beginner/activate-bootstrap-dropdown-on-hover.md",
          "description": "Collapse Bootstrap dropdown menu on mouse over"
        },
        {
          "title": "Loading Progress Bar",
          "slug": "loading-progress-bar",
          "file": "frontend/beginner/loading-progress-bar.md",
          "description": "YouTube-like slim progress bar"
        },
        {
          "title": "Pinterest Grid Layout",
          "slug": "pinterest-grid-layout",
          "file": "frontend/beginner/pinterest-grid-layout.md",
          "description": "Using Masonry.js to create a dynamic grid layout inspired by Pinterest"
        },
        {
          "title": "Bootstrap Sidebar Menu",
          "slug": "bootstrap-sidebar-menu",
          "file": "frontend/beginner/bootstrap-sidebar-menu.md",
          "description": "Creating a sidebar menu with Bootstrap"
        }
      ],
      "intermediate": [
        {
          "title": "Handling Keyboard Shortcuts in JavaScript",
          "slug": "handling-keyboard-shortcuts-in-javascript",
          "file": "frontend/intermediate/handling-keyboard-shortcuts-in-javascript.md",
          "description": "Controlling page interaction with keyboard shortcuts"
        },
        {
          "title": "Infinite Scrolling",
          "slug": "infinite-scrolling",
          "file": "frontend/intermediate/infinite-scrolling.md",
          "description": "Infinite scrolling similar to Facebook, Tumblr, Pinterest"
        },
        {
          "title": "Instant Page Load with InstantClick",
          "slug": "instant-page-load-with-instantclick",
          "file": "frontend/intermediate/instant-page-load-with-instantclick.md",
          "description": "InstantClick prefetches pages on mouseoover, right before you click on the link"
        },
        {
          "title": "Offline Status Notification",
          "slug": "offline-status-notification",
          "file": "frontend/intermediate/offline-status-notification.md",
          "description": "Alerting users when they've lost internet connectivity"
        },
        {
          "title": "Star Rating Plugin",
          "slug": "star-rating-plugin",
          "file": "frontend/intermediate/star-rating-plugin.md",
          "description": "jQuery Raty is a plugin that generates a customizable star rating"
        },
        {
          "title": "Parallax Effect",
          "slug": "parallax-effect",
          "file": "frontend/intermediate/parallax-effect.md",
          "description": "Add parallax scrolling to your website"
        },
        {
          "title": "Search, Filter, Sort Lists or Tables",
          "slug": "search-filter-sort-list-or-tables",
          "file": "frontend/intermediate/search-filter-sort-list-or-tables.md",
          "description": "List.js is tiny library for adding search, sort and filters to existing HTML tables, lists"
        }
      ],
      "advanced": [
        {
          "title": "Organizing Code with RequireJS",
          "slug": "organizing-code-with-requirejs",
          "file": "frontend/advanced/organizing-code-with-requirejs.md",
          "description": "Writing modular JavaScript with RequireJS"
        },
        {
          "title": "Resizable Split Pane Layout",
          "slug": "resizable-split-pane-layout",
          "file": "frontend/advanced/resizable-split-pane-layout.md",
          "description": "Creating a split pane layout similar to JSBin and JSFiddle websites"
        },
        {
          "title": "Tables with Remote Data",
          "slug": "tables-with-remote-data",
          "file": "frontend/advanced/tables-with-remote-data.md",
          "description": "Powerful tables with sorting, filtering, pagination and remote data support"
        }
      ]
    },
    "general": [
      {
        "title": "JavaScript Style Guide",
        "slug": "javascript-style-guide",
        "file": "general/javascript-style-guide.md",
        "description": "Brief overview of popular JavaScript style guides"
      },
      {
        "title": "WebStorm IDE Tips",
        "slug": "webstorm-ide-tips",
        "file": "general/webstorm-ide-tips.md",
        "description": "A list of awesome WebStorm tips that make you more productive"
      },
      {
        "title": "Coding Like a Pro with Emmet",
        "slug": "coding-like-a-pro-with-emmet",
        "file": "general/coding-like-a-pro-with-emmet.md",
        "description": "Handy Emmet snippets for quick prototyping"
      },
      {
        "title": "Development Workflow",
        "slug": "development-workflow",
        "file": "general/development-workflow.md",
        "description": "Workflow of a modern JavaScript Developer "
      }
    ]
  });
