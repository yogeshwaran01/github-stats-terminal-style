import collections
import datetime
import os

import github

GITHUB_TOKEN = os.environ.get("GHT")

gh = github.Github("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")

def align(number: int):
    """ Align the number regarding to templates"""

    return " " + str(number) + " " * (11 - len(str(number)))


class UserStats:
    """ Interactes with GihHub Api and fetch required data """

    def __init__(self, username: str):
        self.user = gh.get_user(username)
        self.user_repos = self.user.get_repos()
        self.name = self.user.name
        self.bio = self.user.bio
        self.web = self.user.blog
        self.stars = sum([repo.stargazers_count for repo in self.user_repos])
        self.forks = sum([repo.forks_count for repo in self.user_repos])
        self.commits = sum(
            [
                0 if repo.fork else repo.get_commits().totalCount
                for repo in self.user_repos
            ]
        )
        self.repos_count = len(list(self.user_repos))
        self.followers = self.user.followers
        self.issues_created = len(list(gh.search_issues('', author=username, type='issue')))
        self.pr_created = len(list(gh.search_issues('', author=username, type='pr')))
        self.watching_repos = len(list(self.user.get_watched()))
        self.gists = len(list(self.user.get_gists()))
        self.hireable = self.user.hireable
        self.created_at = self.user.created_at

def get_stats(username: str):
    """ Returns the stats data of the given username """

    stats = collections.namedtuple(
        "UserStats",
        field_names=[
            "username",
            "name",
            "bio",
            "website",
            "stars",
            "forks",
            "commits",
            "repo",
            "followers",
            "pic",
            "issues",
            "pr",
            "watch",
            "gists",
            'hire',
            'uptime',
        ],
    )

    user = UserStats(username)

    return stats(
        username,
        user.name,
        user.bio,
        user.web,
        align(user.stars),
        align(user.forks),
        align(user.commits),
        align(user.repos_count),
        align(user.followers),
        user.user.avatar_url,
        align(user.issues_created),
        align(user.pr_created),
        user.watching_repos,
        align(user.gists),
        user.hireable,
        (datetime.datetime.now() - user.created_at).days,
    )
