import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer"; // ✅ Add this line

export default function Page() {
  return (
    <>
      <Navbar />
      <SimpleEditor />
      <Footer />
    </>
  );
}
