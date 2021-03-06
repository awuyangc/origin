package com.wy.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class News {
	private NewsType newsType;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.news_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Integer newsId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.news_title
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private String newsTitle;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.user_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private String userId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.create_time
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Date createTime;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.type_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Integer typeId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.publish
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Integer publish;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.isdelete
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Integer isdelete;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.istop
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private Integer istop;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_news.news_content
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	private String newsContent;
	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.news_id
	 * @return  the value of t_news.news_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public Integer getNewsId() {
		return newsId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.news_id
	 * @param newsId  the value for t_news.news_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setNewsId(Integer newsId) {
		this.newsId = newsId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.news_title
	 * @return  the value of t_news.news_title
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public String getNewsTitle() {
		return newsTitle;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.news_title
	 * @param newsTitle  the value for t_news.news_title
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setNewsTitle(String newsTitle) {
		this.newsTitle = newsTitle;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.user_id
	 * @return  the value of t_news.user_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.user_id
	 * @param userId  the value for t_news.user_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.create_time
	 * @return  the value of t_news.create_time
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */ 
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")  
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.create_time
	 * @param createTime  the value for t_news.create_time
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.type_id
	 * @return  the value of t_news.type_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public Integer getTypeId() {
		return typeId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.type_id
	 * @param typeId  the value for t_news.type_id
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.publish
	 * @return  the value of t_news.publish
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public Integer getPublish() {
		return publish;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.publish
	 * @param publish  the value for t_news.publish
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setPublish(Integer publish) {
		this.publish = publish;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.isdelete
	 * @return  the value of t_news.isdelete
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public Integer getIsdelete() {
		return isdelete;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.isdelete
	 * @param isdelete  the value for t_news.isdelete
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setIsdelete(Integer isdelete) {
		this.isdelete = isdelete;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.istop
	 * @return  the value of t_news.istop
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public Integer getIstop() {
		return istop;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.istop
	 * @param istop  the value for t_news.istop
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setIstop(Integer istop) {
		this.istop = istop;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_news.news_content
	 * @return  the value of t_news.news_content
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public String getNewsContent() {
		return newsContent;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_news.news_content
	 * @param newsContent  the value for t_news.news_content
	 * @mbggenerated  Tue May 12 13:26:23 CST 2015
	 */
	public void setNewsContent(String newsContent) {
		this.newsContent = newsContent;
	}

	private String typeName;
	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public NewsType getNewsType() {
		return newsType;
	}

	public void setNewsType(NewsType newsType) {
		this.newsType = newsType;
	}
}