import { ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";
export function load(app) {
  app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
    if (page.filename === "README.md") {
      page.frontmatter = {
        title: "Overview",
        sidebar: { order: 0 },
        ...page.frontmatter,
      };
    }
    const frontmatterKinds = [
      ReflectionKind.Class,
      ReflectionKind.Function,
      ReflectionKind.Interface,
      ReflectionKind.Module,
      ReflectionKind.Enum,
      ReflectionKind.TypeAlias,
      ReflectionKind.ClassMember,
      ReflectionKind.SomeMember,
    ];
    const reflection = page.model;
    if (reflection?.kind) {
      page.frontmatter = {
        title: reflection.name,
        ...page.frontmatter,
      };
    }
  });
}
