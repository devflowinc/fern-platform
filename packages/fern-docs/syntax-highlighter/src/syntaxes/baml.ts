import type { LanguageRegistration } from "shiki";

export default {
  fileTypes: ["baml"],
  name: "baml",
  patterns: [{ include: "#comment" }, { include: "#schema" }],
  repository: {
    $self: {},
    $base: {},

    schema: {
      patterns: [
        { include: "#enum_declaration" },
        { include: "#interface_declaration" },
        { include: "#template_string_declaration" },
        { include: "#function_declaration" },
        { include: "#function_declaration_old" },
        { include: "#config_block" },
        { include: "#type_alias" },
        { include: "#function" },
        { include: "#impl_declaration" },
        { include: "#language_block_python" },
        { include: "#language_block_ts" },
        { include: "#language_block_jinja" },
      ],
    },
    comment: {
      patterns: [
        {
          name: "comment.line",
          match: "//.*",
        },
        {
          name: "comment.block.documentation",
          begin: "///",
          end: "$",
          patterns: [
            {
              name: "comment.block.documentation",
              match: ".*",
            },
          ],
        },
        {
          include: "#curly_comment",
        },
      ],
    },

    enum_declaration: {
      begin: "(enum)\\s+(\\w+)",
      beginCaptures: {
        "1": { name: "storage.type.enum" },
        "2": { name: "entity.name.type" },
      },
      end: "\\}",
      patterns: [
        { include: "#comment" },
        { include: "#block_attribute" },
        {
          name: "variable.other.field",
          match: "\\b[A-Za-z_][A-Za-z0-9_]*\\b",
        },
      ],
    },
    interface_declaration: {
      begin: "(class|override)\\s+(\\w+)\\s*\\{",
      beginCaptures: {
        "1": { name: "storage.type.declaration.interface" },
        "2": { name: "entity.name.type" },
      },
      end: "\\}",
      patterns: [
        { include: "#comment" },
        {
          // comment: "Property + Type",
          begin: "(\\w+)",
          beginCaptures: {
            "1": { name: "variable.other.readwrite" },
          },
          end: "(?=$|\\n|@|\\}|/)",
          patterns: [{ include: "#type_definition" }],
        },
        { include: "#block_attribute" },
      ],
    },
    template_string_declaration: {
      begin: '(template_string)\\s+(\\w+)\\(([^)]*)\\)\\s+(#)(")',
      beginCaptures: {
        "1": { name: "storage.type.declaration.function" },
        "2": { name: "entity.name.function" },
        "3": { name: "variable.parameter.function" },
        "4": { name: "string.quoted.block.baml" },
        "5": { name: "string.quoted.block.baml" },
      },
      end: '(")(#)',
      endCaptures: {
        "1": { name: "string.quoted.block.baml" },
        "2": { name: "string.quoted.block.baml" },
      },
      name: "string.quoted.block.baml",
      patterns: [
        {
          include: "source.baml-jinja",
        },
        { include: "#block_attribute" },
      ],
    },
    function_declaration: {
      // comment: "Function declaration",
      begin: "(function)\\s+(\\w+)",
      beginCaptures: {
        "1": { name: "storage.type.declaration.function" },
        "2": { name: "entity.name.function" },
      },
      end: "\\}",
      patterns: [
        { include: "#comment" },
        { include: "#function_parameters" },
        { include: "#arrow_return_type" },
        { include: "#function_body" },
      ],
    },
    function_parameters: {
      begin: "\\(",
      end: "\\)",
      patterns: [{ include: "#comment" }, { include: "#function_name_type" }],
    },
    function_name_type: {
      patterns: [
        {
          match: "(\\w+)\\s*:",
          captures: {
            "1": { name: "variable.other.readwrite" },
          },
        },
        {
          include: "#type_definition",
        },
      ],
    },
    type_definition: {
      patterns: [
        {
          match: "\\b(bool|int|float|string|null|image|audio)\\b",
          name: "storage.type.declaration.native",
        },
        {
          match: "\\w+",
          name: "support.type",
        },
        {
          match: "\\[\\]",
          name: "keyword.control",
        },
        {
          match: "\\?",
          name: "keyword.control",
        },
        {
          // comment: "union a | b | c",
          match: "\\|",
          name: "keyword.control",
        },
        {
          // comment: "Groups",
          begin: "\\(",
          beginCaptures: {
            "0": { name: "keyword.control" },
          },
          end: "(\\))(\\[\\])*(\\?)?",
          endCaptures: {
            "1": { name: "keyword.control" },
            "2": { name: "keyword.control" },
            "3": { name: "keyword.control" },
          },
          patterns: [{ include: "#type_definition" }],
        },
      ],
    },
    arrow_return_type: {
      begin: "(?<=\\))\\s*(->)\\s*",
      beginCaptures: {
        "1": { name: "keyword.control.baml.arrow" },
      },
      end: "(?=\\{)",
      patterns: [
        {
          include: "#comment",
        },
        {
          include: "#type_definition",
        },
      ],
    },
    function_body: {
      begin: "(?<=\\{)\\s*",
      end: "(?=\\})",
      patterns: [
        { include: "#comment" },
        { include: "#block_attribute" },
        {
          // comment: "Function client properties",
          patterns: [
            {
              match: "(client)\\s+(\\w+)",
              captures: {
                "1": {
                  name: "variable.other.readwrite.client",
                },
                "2": { name: "entity.name.other.client" },
              },
              name: "meta.client.declaration",
            },
            {
              begin: '\\s+(prompt)\\s+(#{1,5})(")',
              beginCaptures: {
                "1": {
                  name: "variable.other.readwrite.prompt",
                },
                "2": {
                  name: "string.quoted.block.baml.prompt",
                },
                "3": {
                  name: "string.quoted.block.baml.prompt",
                },
              },
              end: '\\s*("\\2)',
              contentName: "string.quoted.block.baml.prompt",
              endCaptures: {
                "0": {
                  name: "string.quoted.block.baml.prompt",
                },
              },
              patterns: [{ include: "source.baml-jinja" }],
            },
          ],
        },
      ],
    },
    key_value_pair: {
      begin: "(\\w+)\\s*",
      beginCaptures: {
        "1": { name: "variable.other.readwrite" },
      },
      end: "(?=\\n)",
      patterns: [{ include: "#string_literal" }],
    },
    function_declaration2: {
      begin:
        "(function)\\s+(\\w+)\\(([^)]*)\\)\\s*(->)\\s*([\\w\\s\\[\\]|,?]+)\\s+\\{",
      beginCaptures: {
        "1": { name: "storage.type.declaration.function" },
        "2": { name: "entity.name.function" },
        "3": { name: "variable.parameter.function" },
        "4": { name: "keyword.operator" },
        "5": { name: "support.type" },
      },
      end: "\\}",
      patterns: [
        { include: "#comment" },
        {
          match: "(client)\\s+(\\w+)",
          captures: {
            "1": { name: "variable.other.readwrite.client" },
            "2": { name: "entity.name.other.client" },
          },
          name: "meta.client.declaration",
        },
        {
          begin: '\\s+(prompt)\\s+(#"){1,3}',
          beginCaptures: {
            "1": { name: "variable.other.readwrite.prompt" },
            "2": { name: "string.quoted.block.baml.prompt" },
          },
          end: '\\s*("#)',
          contentName: "string.quoted.block.baml.prompt",
          endCaptures: {
            "1": { name: "string.quoted.block.baml.prompt" },
          },
          patterns: [{ include: "source.baml-jinja" }],
        },
        { include: "#block_attribute" },
      ],
    },
    function_declaration_old: {
      begin: "(function)\\s+(\\w+)\\s*\\{",
      beginCaptures: {
        "1": { name: "storage.type.declaration.function" },
        "2": { name: "entity.name.function" },
      },
      end: "\\}",
      patterns: [
        { include: "#field_declaration_type" },
        { include: "#property_assignment_expression" },
        { include: "#block_attribute" },
        { include: "#comment" },
      ],
    },
    keyword: {
      patterns: [
        {
          match: "\\b(input|output)\\b",
          name: "keyword.special.input-output",
        },
      ],
    },
    field_declaration_type: {
      begin: "\\s*((input)|(output))\\s+",
      end: "(?=$|\\n)",
      beginCaptures: {
        "1": { name: "keyword.special.input-output" },
      },
      patterns: [
        {
          match: "(\\w+)\\s*:",
          captures: {
            "1": { name: "variable.other.readwrite" },
          },
        },
        {
          match: "\\w+",
          name: "support.type",
        },
      ],
    },
    single_variable_no_assignment: {
      match: "^\\s*\\w+\\b",
      name: "variable.other.readwrite",
    },
    config_block: {
      begin:
        "(client|generator|retry_policy|printer|test)\\s*(<([^>]+)>)?\\s+(\\w+)\\s*\\{",
      beginCaptures: {
        "1": { name: "storage.type.declaration" },
        "3": { name: "storage.type.declaration" },
        "4": { name: "entity.name.type" },
      },
      end: "\\}",
      patterns: [
        { include: "#comment" },
        { include: "#block_attribute" },
        { include: "#property_assignment_expression" },
      ],
    },
    impl_declaration: {
      begin: "(impl)\\s*(<([^,>]+),\\s*([^>]+)>)?\\s+(\\w+)\\s*\\{",
      beginCaptures: {
        "1": { name: "storage.type.declaration" },
        "3": { name: "support.type.templateparam" },
        "4": { name: "entity.name.function" },
        "5": { name: "support.type.variant.name" },
      },
      end: "\\}",
      patterns: [
        {
          match: "(client)\\s+(\\w+)",
          captures: {
            "1": { name: "variable.other.readwrite.client" },
            "2": { name: "support.type.client.name" },
          },
        },
        { include: "#comment" },
        { include: "#interface_declaration" },
        { include: "#block_attribute" },
        { include: "#property_assignment_expression" },
      ],
    },
    block_attribute: {
      begin: "(@{1,2}\\w+)\\(",
      end: "\\)",
      captures: {
        "1": { name: "entity.name.function.attribute" },
      },
      patterns: [
        { include: "#comment" },
        { include: "#language_block_python" },
        { include: "#language_block_ts" },
        { include: "#key_value" },
        { include: "#string_unquoted" },
        { include: "#block_string_pair" },
        { include: "#string_literal" },
      ],
    },
    key_value: {
      begin: "\\s*\\{",
      end: "\\s*\\}",
      patterns: [
        { include: "#comment" },
        { include: "#property_assignment_expression" },
      ],
    },
    property_assignment_expression: {
      patterns: [
        { include: "#key_null_pair" },
        { include: "#language_block_python" },
        { include: "#language_block_ts" },

        { include: "#block_string_pair" },

        { include: "#key_value" },
        { include: "#comment" },

        { include: "#key_string_pair" },

        { include: "#key_quoted_string_pair" },
        { include: "#key_number_pair" },
        { include: "#key_boolean_pair" },
        { include: "#key_array_pair" },
        { include: "#key_custom_string_pair" },
        { include: "#nested_key_value" },
      ],
    },
    nested_key_value: {
      begin: '("\\w+"|\\b\\w+\\b)\\s+\\{',
      end: "\\}",
      captures: {
        "1": { name: "variable.other.readwrite" },
      },
      contentName: "variable.other.readwrite.nested",
      patterns: [
        { include: "#comment" },
        { include: "#key_value" },
        { include: "#key_null_pair" },
        { include: "#key_string_pair" },
        { include: "#language_block_python" },
        { include: "#language_block_ts" },

        { include: "#block_string_pair" },
        { include: "#key_quoted_string_pair" },
        { include: "#key_number_pair" },
        { include: "#key_boolean_pair" },
        { include: "#key_array_pair" },
        { include: "#key_custom_string_pair" },
      ],
    },
    language_block_jinja: {
      begin: '(jinja)(#{1,3}")',
      beginCaptures: {
        "1": { name: "comment.line" },
        "2": { name: "string.quoted" },
      },
      end: '\\s*("{1,3}#)',
      endCaptures: {
        "1": { name: "string.quoted" },
      },
      contentName: "source.baml-jinja.embedded",
      patterns: [
        {
          include: "source.baml-jinja",
        },
      ],
    },
    language_block_python: {
      begin: '(python)(#{1,3}")',
      beginCaptures: {
        "1": { name: "comment.line" },
        "2": { name: "string.quoted" },
      },
      end: '\\s*("{1,3}#)',
      endCaptures: {
        "1": { name: "string.quoted" },
      },
      contentName: "source.python.embedded",
      patterns: [
        {
          include: "source.python",
        },
      ],
    },
    language_block_ts: {
      begin: '(typescript)(#{1,3}")',
      beginCaptures: {
        "1": { name: "comment.line" },
        "2": { name: "string.quoted" },
      },
      end: '\\s*("{1,3}#)',
      endCaptures: {
        "1": { name: "string.quoted" },
      },
      contentName: "source.ts.embedded",
      patterns: [
        {
          include: "source.ts",
        },
      ],
    },
    block_string_pair: {
      begin: '(\\w+)?\\s+(#("){1,3})',
      beginCaptures: {
        "1": { name: "variable.other.readwrite" },
        "2": { name: "string.quoted.block.baml.startquote" },
      },
      end: '(("){1,3}#)',
      endCaptures: {
        "1": { name: "string.quoted.block.baml.endquote" },
      },
      contentName: "string.quoted.block.baml.stringpair",
      patterns: [
        {
          include: "#curly_comment",
        },
        {
          name: "entity.name.type.chat",
          match: "\\{#chat\\([^}]*\\)}",
        },
        {
          name: "keyword.special.string.code",
          match: "\\{#[a-zA-Z_][a-zA-Z0-9_.()><]*}",
        },
      ],
    },
    curly_comment: {
      begin: "\\{//",
      beginCaptures: {},
      end: "//}",
      endCaptures: {},
      name: "comment.line.double-slash.baml",
      patterns: [
        {
          include: "#language_block_python",
        },
        {
          include: "#language_block_ts",
        },
      ],
    },
    key_quoted_string_pair: {
      match: '("[^"]+")\\s+("[^"]+")',
      captures: {
        "1": { name: "string.quoted.double" },
        "2": { name: "string.quoted.double" },
      },
    },
    key_string_pair: {
      match: '("\\w+"|\\b\\w+\\b)\\s+("[^"]*")',
      captures: {
        "1": { name: "variable.other.readwrite" },
        "2": { name: "string.quoted.double" },
      },
    },
    key_custom_string_pair: {
      match: '("\\w+"|\\b\\w+\\b)\\s+((?!null)[^\\s\\[\\{]+)',
      captures: {
        "1": { name: "variable.other.readwrite" },
        "2": { name: "string.unquoted" },
      },
    },
    key_number_pair: {
      match: '("\\w+"|\\b\\w+\\b)\\s+(\\b\\d+\\b)',
      captures: {
        "1": { name: "variable.other.readwrite" },
        "2": { name: "constant.numeric" },
      },
    },
    key_boolean_pair: {
      match: '("\\w+"|\\b\\w+\\b)\\s+(\\btrue\\b|\\bfalse\\b)',
      captures: {
        "1": { name: "variable.other.readwrite" },
        "2": { name: "constant.language.boolean" },
      },
    },
    key_null_pair: {
      match: '("\\w+"|\\b\\w+\\b)\\s+(\\bnull\\b)',
      captures: {
        "1": { name: "variable.other.readwrite.null" },
        "2": { name: "constant.language.nil.null" },
      },
    },
    key_array_pair: {
      begin: '("\\w+"|\\b\\w+\\b)\\s+\\[',
      end: "\\]",
      captures: {
        "1": { name: "variable.other.readwrite" },
      },
      contentName: "variable.other.readwrite.array",
      patterns: [
        { include: "#key_array_pair" },
        { include: "#string_quoted" },
        { include: "#constant_numeric" },
      ],
    },
    string_quoted: {
      match: '"[^"]*"',
      name: "string.quoted.double",
    },
    string_unquoted: {
      match: "\\b\\w+\\b",
      name: "string.unquoted",
    },
    constant_numeric: {
      match: "\\b\\d+\\b",
      name: "constant.numeric",
    },
    type_alias: {
      begin: "(type)\\s+(\\w+)",
      beginCaptures: {
        "1": { name: "storage.type.declaration" },
        "2": { name: "entity.name.type" },
      },
      patterns: [{ include: "#comment" }],
    },
    invalid_assignment: {
      name: "invalid.illegal",
      match:
        "\\b[a-zA-Z_][a-zA-Z0-9_]*\\s+[a-zA-Z_][a-zA-Z0-9_]*\\s+[a-zA-Z_][a-zA-Z0-9_]*",
    },
    string_literal: {
      match: '"[^"]*"',
      name: "string.quoted.double",
    },
  },
  scopeName: "source.baml",
} satisfies LanguageRegistration;
