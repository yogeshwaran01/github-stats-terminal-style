import argparse

from jinja2 import Template

from github_utils import get_stats
from themes import get_theme


def update_github_stats_svg(github_data, theme):
    with open("template.svg") as file_obj:
        template_string = file_obj.read()

    with open("github_stats.svg", "w") as file_obj:
        tempate = Template(template_string)
        rendered_string = tempate.render(
            data=github_data,
            theme=theme
        )

        file_obj.write(rendered_string)


def main():
    parser = argparse.ArgumentParser(
        description="Update github_stats.svg with current stats"
    )

    parser.add_argument("username")
    parser.add_argument(
        "--theme",
        required=False,
        help="Name of theme",
        default="random",
    )

    arguments = parser.parse_args()

    user_data = get_stats(arguments.username)
    theme = get_theme(arguments.theme)

    update_github_stats_svg(user_data, theme)


if __name__ == "__main__":
    main()
