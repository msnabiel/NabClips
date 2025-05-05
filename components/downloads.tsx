import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";

const features = [
  {
    icon: ClipboardCopy,
    title: "STS302P - Cheat Sheet",
    description:
      "Winter Semester 2024-2025 STS302P Cheat Sheet",
    file: "/downloads/STS_CAT1_CAT2.pdf", // Make sure this file is in your /public/downloads folder
  },
];

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Downloads component.
 *
 * Downloads is a component that renders a section of the app containing a
 * list of courses, each with a downloadable resource.
 *
 * It expects a list of features, each containing the following properties:
 *
 * - `icon`: a React component to use as the icon for the feature
 * - `title`: a string to use as the title for the feature
 * - `description`: a string to use as the description for the feature
 * - `file`: a string to use as the href for the feature's downloadable resource
 *
 * The component renders a heading with the title "Select a Course to Download
 * Resources", followed by a grid of cards, each containing a feature. The
 * cards are rendered with a hover effect, and the icon, title, and description
 * are centered horizontally.
 *
 * The component also renders a CardFooter with a background color of
 * `bg-muted` and a height of `52px`.
 *
 * @returns {JSX.Element} The Downloads component.
 */
/*******  5ea65d2c-a013-47c2-81d0-fc08137521f0  *******/
const Downloads = () => {
  return (
    <div
      id="downloads"
      className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
    >
      <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
        Select a Course to Download Resources
      </h2>
      <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {features.map((feature) => (
          <a
            key={feature.title}
            href={feature.file}
            download
            className="block"
          >
            <Card className="flex flex-col border rounded-xl overflow-hidden shadow-none transition-transform hover:scale-105">
              <CardHeader className="p-6 flex flex-col items-center">
                <feature.icon className="h-12 w-12 text-accent" />
                <h4 className="mt-3 text-xl font-bold tracking-tight text-center">
                  {feature.title}
                </h4>
                <p className="mt-2 text-muted-foreground text-sm xs:text-base text-center">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                <div className="bg-muted h-52 ml-6 rounded-tl-xl" />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
