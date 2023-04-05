# Cropping

## Adobe Illustrator

- Using Illustrator so that all of the photos can be viewed as a set

- Adjust the display size so the artwork can be viewed at 100% (otherwise the layouts will look
  gigantic)

- Illustrator – Preferences > General, turn off “Display Print Size at 100% Zoom” (this option was
  newly added in 2019, so it should be off by default in older versions)

## Alumni

- All photos will need to be cropped, including previous alumni photos, to a specific size in order
  to maintain constistency in page layout
- The final size should be 960 x 1280px(@2x of the largest displayed size), with an aspect ratio of
  3:4
- A Portrait Template(Portraits-Template.ai) has been provided and is in the `assets/Template`
  folder, along with 2 reference cohort files, and reference videos relating to the suggested steps,
  listed below:

1. Open template, save a new version for specific cohort

1. Select 5 photos, go to the Links panel, use the hamburger menu for "Relink..."

1. Relink with 5 new portraits

1. Repeat until all new cohort portraits are linked (you can select more than 5 at a time once
   you're more comfortable with the process )
1. Use the magenta guides to position the face, eyes, shoulders – look out for any awkward slivers
   of background on the left/right edges. Use the white arrow to directly target the photo instead
   of resizing the clipping mask (or use isolation mode)

1. Export for screens, name the artboard for each person

1. Export @1x JPGs (these are already placed at the largest display size) with an appropriate prefix
   (ie: Juno-2019Spring-)

1. Use JPEGMini or something similar to optimize the exports (this will reduce the file sizes by
   ~40%)

## Blog post photos

- Each blog post needs a photo that is 1200 x 825px (aspect ratio of 16 : 11)

- We have provided 30 cropped images to get you started(currently located 'src/assets/images/'). The
  fastest way to crop these photos in the future would either be with a Photoshop action, or an
  Illustrator file with ~50 artboards that you can just "Export for Screens..." from.

- It is recommended to run images through additional optimization like with JPEGmini.

- Each blog post author also needs a headshot that is square. The largest display size of the author
  photo is a 70x70 circle, so a 200 x 200px author photo would work.

- Ideally the circular author photo should NOT be automatically generated from the 3:4 team member
  portrait, since the crop of the head can't be guaranteed.

## Enhanced blog post photos

- The Enhanced blog post template should be used for Student Stories, Hiring Partner spotlights, and
  Instructor profiles

- The header for this template requires 2 separate photos:

  > 1. Portrait orientation (960 x 1280px)
  > 1. Landscape mood bg (1836 x 1280px)

- The landscape mood bg has a subtle gradient anchored from the top to help the "Back to list" text
  stay legible (this gradient has been provided as a PNG/SVG slice to repeat-x, but you can recreate
  in CSS to match the mockups)

- The images used in the enhanced post itself are fairly flexible:
  > - About card photo (ideally square)
  > - Header photos (any height, fills full width of the container column)
  > - Inline embeds, photos, videos (fills same text column width)
  > - Photo strip with 3 square images, stackable
  > - Student portfolio work if required (with drop-shadow behind the work ... the Illustrator
  >   settings for this shadow is a rgba(0,0,0,0.2) shadow, with Yoffset of 10px, blur of 12px)
