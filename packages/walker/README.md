Walker
A React client library for prompt-driven UI/UX interaction to power the future bewteen human and AI.

Official docs: https://www.notion.so/White-paper-2a0610871b58809cbf3ffe993a5a45a2?source=copy_link

Example commands:
Single
||click?:query=:[data-walker-key="go-shopping"] > *&:message=:hello||
||input?:query=:[data-walker-key="input-delivery-notes"] > *&:data=:Please call in advance||

Chained
||click?:query=:[data-walker-key="go-shopping"] > *&:message=:Let's go shopping||||click?:query=:[data-walker-key="nav-cart"] > *&:message=:Going to your shopping cart||
