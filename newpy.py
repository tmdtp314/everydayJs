def custom_tag(string):
    def custom_tag_func(function):
        def custom_tag_var(*args,**kwargs):
            if string=='볼드':
                return '<b>'+function(*args,**kwargs)+'</b>'
            elif string=='이태릭':
                return '<i>'+function(*args,**kwargs)+'</i>'
            elif string=='크게':
                return '<h1>'+function(*args,**kwargs)+'</h1>'
            elif string=='작게':
                return '<h5>'+function(*args,**kwargs)+'</h5>'
            else:
                return '<h2>'+function(*args,**kwargs)+'</h2>'
        return custom_tag_var
    return custom_tag_func
    
@custom_tag('작게')
def print_tag(a):
    return a


print(print_tag("안녕"))


from string import ascii_lowercase, ascii_uppercase

def text_style(function):
    def text_style_inner(pwd):
        if(function(pwd)==True):
            print('적합한 암호문입니다')
            print('<b>'+pwd+'</b>')
        else:
            print('비밀번호는 영소문자, 영대문자, 특수문자와 숫자로 이루어져야 합니다')
            print('<i>'+pwd+'</i>')
    return text_style_inner


@text_style
def val_check_inner(pwd):
    alpha_listA = list(ascii_lowercase)
    alpha_listB = list(ascii_uppercase)
    number_list=['1','2','3','4','5','6','7','8','9','0']
    special_list=['@','!','.','$','#','%','^','&','*']
    pwd_list=list() 
    check_list=list()
    check_list2=list()
    check_list3=list()
    check_list4=list()
    for pwd_ in pwd:
        pwd_list.append(pwd_)
    print(pwd_list)
    for nl in number_list:
        if nl in pwd_list:
            check_list.append(0)
        else:
            check_list.append(1)
    print(len(check_list))
    for sl in special_list:
        if sl in pwd_list:
            check_list2.append(0)
        else:
            check_list2.append(1)
    print(len(check_list2))
    for a in alpha_listA:
        if a in pwd_list:
            check_list3.append(0)
        else:
            check_list3.append(1)
    for A in alpha_listB:
        if A in pwd_list:
            check_list4.append(0)
        else:
            check_list4.append(1)
    if (sum(check_list)<len(number_list)) and (sum(check_list2)<len(special_list)) and (sum(check_list3)<len(alpha_listA)) and (sum(check_list4)<len(alpha_listB)):
        return True
    else:
        return False
    

val_check_inner('tmdtp314A*')