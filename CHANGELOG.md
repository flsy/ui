# 0.8.0
- removed css imports from RangePicker, now it needs to be imported in the applicatio nwhich uses falsy ui

`
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
`

# 0.6.6
- Themed datepicker
- Fixed datepicker and datetimepicker bugs
- Input autocomplete prop set to off

# 0.6.5
- Themed datatable selected row, sort and filter form
- Updated datatable loader
- Updated Button padding for sm and xs sizes
- Themed navigation

# 0.6.4
- Loading animation is using theme
- Navigation accepts one or multiple children

# 0.6.3
- Layout exported as styled component

# 0.6.2
- Navigation exported as styled component

# 0.6.1
- File uploader better state handling.

# 0.6.0
- File uploader returns file name

# 0.5.0
- Active state for inputs in theme colors
- Checkbox check mark in theme colors

# 0.4.0
- Added FileUploader

# 0.3.0
- Added MetaTable module
- Added Pagination component

### Button
- removed `value` property
- removed `id` property
- removed `iconLeft` and `iconRight` properties, use `icon` property instead
- content of a button passed as a children instead of `text` property

### LinkButton
- renamed to `Link`

### ButtonIcon
- removed, use Button instead

# 0.2.0
- Removed Chevron, Label, Typography, Tags

### DownloadButton
- Renamed from Downloader
- Changed size to medium
- Removed property hasIcon
- Added property icon accepting ReactNode

### Tags
- Removed Tags wrapper, exported just Tag
- Added type property for colorful tags

### Container
- Added white background
- Exported styled component

### Layout
- Removed background

# 0.1.0
