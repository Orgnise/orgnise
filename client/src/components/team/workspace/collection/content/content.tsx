'use client'

import { Button } from "@/components/ui/button";
import { Collection } from "@/lib/types/types";
import { Editor } from "novel";
import Label from "@/components/atom/label";
import { hasValue } from "@/lib/utils";

export default function CollectionContent({activeItem}:{activeItem?:Collection}) {
  

  if (!hasValue(activeItem)) {
    return (
      <div className="CollectionContent flex-1 flex flex-col items-center place-content-center h-full max-w-xl text-center mx-auto">
        <span className="font-normal">
          Items are{" "}
          <Label variant="t2" className="mx-1 ">
            collaborative documents
          </Label>
          that help you capture knowledge. For example, a{" "}
          <Label variant="t2" className="mx-1 ">
            meeting note
          </Label>
          item could contain decisions made in a meeting. Items can be grouped
          and nested with collections.
        </span>
        <Button
          variant={"outline"}
          className="mt-4 "
          onClick={() => {
            // createCollection();
          }}
        >Create Item</Button>
      </div>
    );
  }

  if (!activeItem) {
    return (
      <div className="CollectionContent flex flex-col items-center place-content-center h-full py-8">
        <Label size="body" variant="t2">
          Nothing is selected
        </Label>

        <Label size="caption" variant="s1">
          Select and item or collection from the left panel
        </Label>
      </div>
    );
  }
  return (
    <>
     <Editor
        // key={activeItem!._id}
        className="shadow-none p-0 m-0 w-full"
        storageKey={activeItem!._id}
        onUpdate={(editor) => { }}
        // extensions={["header", "list", "image"]}
        defaultValue={activeItem?.content}
        editorProps={{
          // placeholder: "Let's write an awesome story!",
          // autofocus: true,


        }}
        onDebouncedUpdate={(editor) => {
          //   setContent(editor.getJSON());
        }}
      />
    </>
  );
}