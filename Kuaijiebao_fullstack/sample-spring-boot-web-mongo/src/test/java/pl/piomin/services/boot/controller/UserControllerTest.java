package pl.piomin.services.boot.controller;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.piomin.services.boot.Application;
import pl.piomin.services.boot.data.AfRepository;
import pl.piomin.services.boot.data.CalenderUserRepository;
import pl.piomin.services.boot.model.AssetFlow;
import pl.piomin.services.boot.model.CalendarUser;
import pl.piomin.services.boot.model.Debt;
import pl.piomin.services.boot.payload.SigninForm;
import pl.piomin.services.boot.payload.SignupForm;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CalenderUserRepository repository;

    @Before
    public void initDb() {
        CalendarUser user=new CalendarUser();
        user.setId(333);
        user.setFirstName("stephanie");
        user.setLastName("koe");
        user.setEmail("steph@qq.com");
        user.setPassword("imsteph");

        repository.save(user);
    }

    @After
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void whenFindAll_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidId_whenFindById_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user/"+"222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenGetUserBankcard_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user/bankcard/222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserIdAndPassword_whenChangePassword_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user/password/333/imsteph").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }


    @Test
    public void givenUserId_whenFindUserSpecByUserId_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user/spec/222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void givenValidUserId_whenGetUserBalance_thenStatus200() throws IOException, Exception {
        CalendarUser user=new CalendarUser();
        mvc.perform(get("/user/balance/222").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }


    @Test
    public void givenValidSignInForm_whenSignUp_thenStatus200() throws IOException, Exception {

        SignupForm form=new SignupForm("aikawa","satoshi","example@qq.com","impassword",
                "imaddress1","imaddress2","imcity","imzip","imstate","imcountry",
                "imname","imexpiry","imcvc","imcardNum");

        mvc.perform(post("/user/signup").contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(form)));

        List<CalendarUser> found = repository.findAll();
        assertThat(found).extracting(CalendarUser::getFirstName).contains("aikawa");
    }

    @Test
    public void givenValidSignInForm_whenSignIn_thenStatus200() throws IOException, Exception {

        SigninForm form=new SigninForm("steph@qq.com","imsteph");

        mvc.perform(post("/user/signin").contentType(MediaType.APPLICATION_JSON).content(JsonUtil.toJson(form)));

        List<CalendarUser> found = repository.findAll();
        assertThat(found).extracting(CalendarUser::getFirstName).contains("stephanie");
    }


    @Test
    public void givenValidBankcardId_whenRemoveUserBankCard_thenStatus200() throws Exception {

        CalendarUser user=new CalendarUser();
        mvc.perform(delete("/user/bankcard/"+"111").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
}