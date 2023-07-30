import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { makeAutoObservable } from "mobx";
import { Octokit } from "octokit";

export enum SearchTypeEnum {
	repositories = "repos",
	users = "users",
}

export const octokit: Octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
});

export type SearchReposType = GetResponseDataTypeFromEndpointMethod<
	typeof octokit.rest.search.repos
>;

export type SearchUsersType = GetResponseDataTypeFromEndpointMethod<
	typeof octokit.rest.search.users
>;

export type SearchResultMapType = {
	[SearchTypeEnum.repositories]: SearchReposType;
	[SearchTypeEnum.users]: SearchUsersType;
};

export type ValidationMsgType = { isValid: boolean; errorMessage: string };

export class Search {
	public loading: boolean = false;
	public query: string = "";

	public page: number = 1;
	public itemsNumber: number = 0;
	public validation: ValidationMsgType = { isValid: true, errorMessage: "" };

	public type: SearchTypeEnum = SearchTypeEnum.repositories;
	public searchResultMap: SearchResultMapType = {
		[SearchTypeEnum.repositories]: {} as SearchReposType,
		[SearchTypeEnum.users]: {} as SearchUsersType,
	};

	constructor() {
		makeAutoObservable(this);
	}

	public reset() {
		this.loading = false;
		this.query = "";
		this.page = 1;
		this.itemsNumber = 0;
		this.validation = { isValid: true, errorMessage: "" };
	}

	public setType(type: SearchTypeEnum) {
		this.type = type;
		this.reset();
	}

	public setQuery(query: string) {
		this.query = query;
	}

	private formatQuery(query: string) {
		return query.replace(" ", "+");
	}

	private toggleLoading() {
		this.loading = !this.loading;
	}

	private setItemsNumber(num: number) {
		this.itemsNumber = num;
	}

	public increasePageNumber() {
		this.page += 1;
	}
	public resetPageNumber() {
		this.page = 1;
	}

	private setUserSearchResult(data: SearchUsersType) {
		this.searchResultMap[SearchTypeEnum.users]["items"] = [
			...(this.searchResultMap[SearchTypeEnum.users]["items"]
				? this.searchResultMap[SearchTypeEnum.users]["items"]
				: []),
			...data.items,
		];
	}

	private setRepoSearchResult(data: SearchReposType) {
		this.searchResultMap[SearchTypeEnum.repositories]["items"] = [
			...(this.searchResultMap[SearchTypeEnum.repositories]["items"]
				? this.searchResultMap[SearchTypeEnum.repositories]["items"]
				: []),
			...data.items,
		];
	}

	public setSearchResultToDefault() {
		this.searchResultMap = {
			[SearchTypeEnum.repositories]: {} as SearchReposType,
			[SearchTypeEnum.users]: {} as SearchUsersType,
		};
	}

	public setError(error: string, valid: boolean = false) {
		this.validation = { isValid: valid, errorMessage: error };
	}

	public async searchGitHub() {
		try {
			this.toggleLoading();

			const res = await octokit.rest.search[this.type]({
				q: this.formatQuery(this.query),
				page: this.page,
				per_page: 10,
			});

			if (this.type === SearchTypeEnum.repositories) {
				this.setRepoSearchResult(res.data as SearchReposType);
			} else if (this.type === SearchTypeEnum.users) {
				this.setUserSearchResult(res.data as SearchUsersType);
			}

			this.increasePageNumber();
			this.setItemsNumber(res.data.total_count);
		} catch (error) {
			this.setError(error.message);
		} finally {
			this.toggleLoading();
		}
	}
}
