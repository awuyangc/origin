package com.wy.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InviteInfo {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.id
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.invite_openId
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    private String inviteOpenid;

    private WeixinUser weixinUser;
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.invite_day
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date inviteDay;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.invite_begin
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    @JsonFormat(pattern="HH:mm",timezone = "GMT+8")
    private Date inviteBegin;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.invite_end
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    @JsonFormat(pattern="HH:mm",timezone = "GMT+8")
    private Date inviteEnd;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.invite_address
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    private String inviteAddress;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_invite_info.create_time
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date createTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.id
     *
     * @return the value of t_invite_info.id
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.id
     *
     * @param id the value for t_invite_info.id
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.invite_openId
     *
     * @return the value of t_invite_info.invite_openId
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public String getInviteOpenid() {
        return inviteOpenid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.invite_openId
     *
     * @param inviteOpenid the value for t_invite_info.invite_openId
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setInviteOpenid(String inviteOpenid) {
        this.inviteOpenid = inviteOpenid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.invite_day
     *
     * @return the value of t_invite_info.invite_day
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public Date getInviteDay() {
        return inviteDay;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.invite_day
     *
     * @param inviteDay the value for t_invite_info.invite_day
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setInviteDay(Date inviteDay) {
        this.inviteDay = inviteDay;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.invite_begin
     *
     * @return the value of t_invite_info.invite_begin
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public Date getInviteBegin() {
        return inviteBegin;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.invite_begin
     *
     * @param inviteBegin the value for t_invite_info.invite_begin
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setInviteBegin(Date inviteBegin) {
        this.inviteBegin = inviteBegin;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.invite_end
     *
     * @return the value of t_invite_info.invite_end
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public Date getInviteEnd() {
        return inviteEnd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.invite_end
     *
     * @param inviteEnd the value for t_invite_info.invite_end
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setInviteEnd(Date inviteEnd) {
        this.inviteEnd = inviteEnd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.invite_address
     *
     * @return the value of t_invite_info.invite_address
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public String getInviteAddress() {
        return inviteAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.invite_address
     *
     * @param inviteAddress the value for t_invite_info.invite_address
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setInviteAddress(String inviteAddress) {
        this.inviteAddress = inviteAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_invite_info.create_time
     *
     * @return the value of t_invite_info.create_time
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_invite_info.create_time
     *
     * @param createTime the value for t_invite_info.create_time
     *
     * @mbggenerated Mon Jun 29 11:27:27 CST 2015
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

	public WeixinUser getWeixinUser() {
		return weixinUser;
	}

	public void setWeixinUser(WeixinUser weixinUser) {
		this.weixinUser = weixinUser;
	}
}